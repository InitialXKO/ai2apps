import child_process,{spawn} from 'child_process';
import { promisify } from 'util';
import pty from "node-pty";
import Terminal  from './nodeterm.js';

//----------------------------------------------------------------------------
async function getCondaPath() {
	let execPromise = promisify(child_process.exec);
	try {
		const { stdout, stderr } = await execPromise('conda env list --json');
		const condaVO=JSON.parse(stdout);
		return condaVO.root_prefix;
	} catch (error) {
		console.error('Error fetching conda environments:', error.message);
		return null;
	}
}

//****************************************************************************
//BashFrame
//****************************************************************************
let AgentNodeTerminal,agentNodeTerminal;
{
	let nextShellId=1;
	AgentNodeTerminal=function(session){
		this.session=session;
		this.agentNode=session.agentNode;
		this.id=""+(nextShellId++);
		this.sessionId=null;
		this.clientReady=null;
		this.terminal=null;
		this.shell=null;
		this.waitPms=null;
		this.waitCallback=null;
		this.alive=false;
		this.idle=false;
		this.killPms=null;
		this.killCallback=null;
		this.waitBuf="";
	};
	agentNodeTerminal=AgentNodeTerminal.prototype={};
	
	//------------------------------------------------------------------------
	agentNodeTerminal.start=async function(opts,commands){
		let shell,terminal,optsCommands;
		opts=opts||{};
		terminal=this.terminal = Terminal({
			cols: opts.w||800,
			rows: opts.h||30,
		});
		shell=this.shell=pty.spawn('bash', [], {
			name: 'xterm-color',
			cols: opts.w||800,
			rows: opts.h||30,
			cwd: process.env.HOME,
			env: process.env
		});
		this.alive=true;
		//Handle exit:
		{
			shell.on("exit",(code,sig)=>{
				let callback;
				this.alive=false;
				this.idle=false;
				callback=this.killCallback;
				if(callback){
					this.killCallback=null;
					this.killPms=null;
					callback();
				}
			});
		}
		//Handle data:
		{
			shell.onData((data) => {
				terminal.write(data);
				this.waitBuf += data.toString();
				process.stdout.write(data);
				if (this.waitBuf.includes('__AGENT_SHELL__> ')) {
					this.idle=true;
					if(this.waitCallback){
						this.waitCallback();
						this.waitBuf="";
					}
				}
				if(this.clientReady && this.sessionId){
					this.agentNode.sendToHub("XTermData",{data:data,session:this.sessionId});
				}
			});
		}
		shell.write(`PS1="__AGENT_SHELL__> "\n`);
		
		if(this.session && opts.client){
			let res,sessionId;
			try {
				res = await this.agentNode.callHub("XTermCreate", {node:this.agentNode.name});
				if(!res || res.code!==200){
					throw Error(`Hub create terminal error${res.info?" "+res.info:"."}`);
				}
				this.sessionId=sessionId=res.session||res.sessionId;
				this.session.regTerminal(this);
				res=await this.session.callClient("CreateXTerm",{session:sessionId});
				if(res===false){
					this.sessionId=null;
				}
				this.clientReady=true;
			}catch(err){
				this.sessionId=null;
			}
		}
		if(opts.initConda){
			let condaPath;
			condaPath=await getCondaPath();
			if(condaPath){
				await this.runCommands(`source ${condaPath}/etc/profile.d/conda.sh`);
			}
		}
		optsCommands=opts.commands||opts.command;
		if(optsCommands && !Array.isArray(optsCommands)){
			optsCommands=[optsCommands];
		}
		if(commands){
			if(optsCommands){
				commands.push(...optsCommands);
			}
		}else{
			commands=optsCommands;
		}
		if(commands){
			await this.runCommands(commands);
		}
	};
	
	//------------------------------------------------------------------------
	agentNodeTerminal.close=async function(){
		let pms;
		if(this.alive){
			return;
		}
		if(this.killPms){
			await this.killPms;
			return;
		}
		pms=this.killPms=new Promise((resolve,reject)=>{
			this.killCallback=resolve;
		});
		this.shell.kill('SIGTERM');
		setTimeout(()=>{
			if(this.alive && this.shell){
				this.shell.kill('SIGKILL');
			}
		},30000);
		await pms;
		this.shell=null;
	};
	
	//------------------------------------------------------------------------
	agentNodeTerminal.write=function(text){
		this.waitBuf="";
		this.shell.write(text);
	};
	
	//------------------------------------------------------------------------
	agentNodeTerminal._command=async function(command){
		let pms,callback,callerr;
		if(!command){
			return;
		}
		if(this.waitPms){
			await this.waitPms;
		}
		pms=this.waitPms=new Promise((resolve,reject)=>{
			callback=resolve;
			callerr=reject;
			this.waitCallback=resolve;
		});
		if(!command.endsWith("\r")){
			command+="\r";
		}
		this.idle=false;
		this.write(command);
		await pms;
	};
	
	//------------------------------------------------------------------------
	agentNodeTerminal.runCommands=async function(commands){
		let command,cntLen,content;
		if(!commands){
			return;
		}
		content=this.getContent();
		cntLen=content.length;
		if(!Array.isArray(commands)){
			commands=[commands];
		}
		for(command of commands){
			await this._command(command);
		}
		content=this.getContent();
		return content.substring(cntLen);
	};
	
	//------------------------------------------------------------------------
	agentNodeTerminal.clear=function(){
		this.terminal.clear("__AGENT_SHELL__> ");
	};
	
	//------------------------------------------------------------------------
	agentNodeTerminal.getContent=function(){
		return this.terminal.getContent();
	};
}
export default AgentNodeTerminal;
export {AgentNodeTerminal};