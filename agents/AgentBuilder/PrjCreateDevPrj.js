//Auto genterated by Cody
import {$P,VFACT,callAfter,sleep} from "/@vfact";
import pathLib from "/@path";
import inherits from "/@inherits";
import Base64 from "/@tabos/utils/base64.js";
import {trimJSON} from "/@aichat/utils.js";
/*#{1IK2OCGG60MoreImports*/
import {tabNT} from "/@tabos";
import {getCloudDiskInfo,checkOutDisk,getDiskChanges,commitDisk,updateDisk,checkInDisk,genSandBoxData,restoreSandbox} from "/@disk/utils.js";
import {installPkg,uninstallPkg,redirectPkgTag,installPkgOnDisk,setupDiskPkgs} from "/@pkg/pkgUtil.js";
import {filterJSONPath} from "../filterjson.js";
/*}#1IK2OCGG60MoreImports*/
const agentURL=(new URL(import.meta.url)).pathname;
const basePath=pathLib.dirname(agentURL);
const $ln=VFACT.lanCode||"EN";
const argsTemplate={
	properties:{
		"diskId":{
			"name":"diskId","type":"auto",
			"defaultValue":"",
			"desc":"",
		},
		"diskName":{
			"name":"diskName","type":"auto",
			"defaultValue":"",
			"desc":"",
		}
	},
	/*#{1IK2OCGG60ArgsView*/
	/*}#1IK2OCGG60ArgsView*/
};

/*#{1IK2OCGG60StartDoc*/
/*}#1IK2OCGG60StartDoc*/
//----------------------------------------------------------------------------
let PrjCreateDevPrj=async function(session){
	let diskId,diskName;
	const $ln=session.language||"EN";
	let context,globalContext=session.globalContext;
	let self;
	let Start,CreateTTY,TipCheckOut,CheckOutDisk,TipFilterJSON,FilterJSON,CheckSetupScript,SetupScript,TipError,AskOpenPrj,OpenIDE,Exit;
	let tty=null;
	
	/*#{1IK2OCGG60LocalVals*/
	/*}#1IK2OCGG60LocalVals*/
	
	function parseAgentArgs(input){
		if(typeof(input)=='object'){
			diskId=input.diskId;
			diskName=input.diskName;
		}else{
			diskId=undefined;
			diskName=undefined;
		}
		/*#{1IK2OCGG60ParseArgs*/
		/*}#1IK2OCGG60ParseArgs*/
	}
	
	/*#{1IK2OCGG60PreContext*/
	/*}#1IK2OCGG60PreContext*/
	context={};
	context=VFACT.flexState(context);
	/*#{1IK2OCGG60PostContext*/
	/*}#1IK2OCGG60PostContext*/
	let agent,segs={};
	segs["Start"]=Start=async function(input){//:1IK2RV2SP0
		let result=input;
		/*#{1IK2RV2SP0Code*/
		false
		/*}#1IK2RV2SP0Code*/
		return {seg:CreateTTY,result:(result),preSeg:"1IK2RV2SP0",outlet:"1IK2S287H0",catchSeg:TipError,catchlet:"1IK2S287H1"};
	};
	Start.jaxId="1IK2RV2SP0"
	Start.url="Start@"+agentURL
	
	segs["CreateTTY"]=CreateTTY=async function(input){//:1IK2RBN550
		let result=input
		/*#{1IK2RBN550Code*/
		tty=await session.WSCall_CreateTTY();
		/*}#1IK2RBN550Code*/
		return {seg:TipCheckOut,result:(result),preSeg:"1IK2RBN550",outlet:"1IK2RC6560"};
	};
	CreateTTY.jaxId="1IK2RBN550"
	CreateTTY.url="CreateTTY@"+agentURL
	
	segs["TipCheckOut"]=TipCheckOut=async function(input){//:1IK2RF0FP0
		let result=input;
		let opts={};
		let role="assistant";
		let content=(($ln==="CN")?("下载项目内容……"):("Downloading project content..."));
		session.addChatText(role,content,opts);
		return {seg:CheckOutDisk,result:(result),preSeg:"1IK2RF0FP0",outlet:"1IK2RJOOU1"};
	};
	TipCheckOut.jaxId="1IK2RF0FP0"
	TipCheckOut.url="TipCheckOut@"+agentURL
	
	segs["CheckOutDisk"]=CheckOutDisk=async function(input){//:1IK2RE3MV0
		let result=input
		/*#{1IK2RE3MV0Code*/
		await checkOutDisk(tty,diskId,null,diskName,false);
		await setupDiskPkgs(tty,diskName);
		/*}#1IK2RE3MV0Code*/
		return {seg:TipFilterJSON,result:(result),preSeg:"1IK2RE3MV0",outlet:"1IK2RJOOU0"};
	};
	CheckOutDisk.jaxId="1IK2RE3MV0"
	CheckOutDisk.url="CheckOutDisk@"+agentURL
	
	segs["TipFilterJSON"]=TipFilterJSON=async function(input){//:1IK2RFIAF0
		let result=input;
		let opts={};
		let role="assistant";
		let content=(($ln==="CN")?("更新配置文件……"):("Updating configuration file..."));
		session.addChatText(role,content,opts);
		return {seg:FilterJSON,result:(result),preSeg:"1IK2RFIAF0",outlet:"1IK2RJOOU2"};
	};
	TipFilterJSON.jaxId="1IK2RFIAF0"
	TipFilterJSON.url="TipFilterJSON@"+agentURL
	
	segs["FilterJSON"]=FilterJSON=async function(input){//:1IK2RHL740
		let result=input
		/*#{1IK2RHL740Code*/
		let path,vals,userVO;
		path="/"+diskName;
		vals={
			prj_path:path,
			prj_name:diskName
		};
		if(await tabNT.checkLogin(true)){
			userVO=tabNT.loginVO;
			vals.email=userVO.email;
			vals.user_id=vals.userId;
			vals.user_name=vals.name;
		}
		await filterJSONPath(path,vals);
		/*}#1IK2RHL740Code*/
		return {seg:CheckSetupScript,result:(result),preSeg:"1IK2RHL740",outlet:"1IK2RJOOU3"};
	};
	FilterJSON.jaxId="1IK2RHL740"
	FilterJSON.url="FilterJSON@"+agentURL
	
	segs["CheckSetupScript"]=CheckSetupScript=async function(input){//:1IK2RJ3LR0
		let result=input;
		/*#{1IK2RJ3LR0Start*/
		let setup;
		try{
			setup=(await import(`/~/${diskName}/setup.js`)).setupPrj;
		}catch(err){
			setup=null;
		}
		/*}#1IK2RJ3LR0Start*/
		if(!!setup){
			return {seg:SetupScript,result:(input),preSeg:"1IK2RJ3LR0",outlet:"1IK2RJOOU4"};
		}
		/*#{1IK2RJ3LR0Post*/
		/*}#1IK2RJ3LR0Post*/
		return {seg:AskOpenPrj,result:(result),preSeg:"1IK2RJ3LR0",outlet:"1IK2RJOOU5"};
	};
	CheckSetupScript.jaxId="1IK2RJ3LR0"
	CheckSetupScript.url="CheckSetupScript@"+agentURL
	
	segs["SetupScript"]=SetupScript=async function(input){//:1IK2RKCBN0
		let result;
		let sourcePath=pathLib.joinTabOSURL(basePath,"./PrjTabOSPrjSetup.js");
		let arg={"dirPath":"/"+diskName,"setupType":"setupPrj"};
		result= await session.pipeChat(sourcePath,arg,false);
		return {seg:AskOpenPrj,result:(result),preSeg:"1IK2RKCBN0",outlet:"1IK2RUJD70"};
	};
	SetupScript.jaxId="1IK2RKCBN0"
	SetupScript.url="SetupScript@"+agentURL
	
	segs["TipError"]=TipError=async function(input){//:1IK2RVNMD0
		let result=input;
		let opts={};
		let role="assistant";
		let content=input;
		session.addChatText(role,content,opts);
		return {result:result};
	};
	TipError.jaxId="1IK2RVNMD0"
	TipError.url="TipError@"+agentURL
	
	segs["AskOpenPrj"]=AskOpenPrj=async function(input){//:1IK2S4UGP0
		let prompt=((($ln==="CN")?("开发项目工程已创建，是否在IDE里打开工程？"):("Development project has been created, do you want to open it in the IDE?")))||input;
		let countdown=undefined;
		let placeholder=(undefined)||null;
		let withChat=false;
		let silent=false;
		let items=[
			{icon:"/~/-tabos/shared/assets/dot.svg",text:(($ln==="CN")?("在IDE中打开工程"):("Open project in IDE")),code:0},
			{icon:"/~/-tabos/shared/assets/dot.svg",text:(($ln==="CN")?("退出，不打开工程"):("Exit without opening project")),code:1},
		];
		let result="";
		let item=null;
		
		if(silent){
			result="";
			return {seg:OpenIDE,result:(result),preSeg:"1IK2S4UGP0",outlet:"1IK2S4UGC0"};
		}
		[result,item]=await session.askUserRaw({type:"menu",prompt:prompt,multiSelect:false,items:items,withChat:withChat,countdown:countdown,placeholder:placeholder});
		if(typeof(item)==='string'){
			result=item;
			return {result:result};
		}else if(item.code===0){
			return {seg:OpenIDE,result:(result),preSeg:"1IK2S4UGP0",outlet:"1IK2S4UGC0"};
		}else if(item.code===1){
			return {seg:Exit,result:(result),preSeg:"1IK2S4UGP0",outlet:"1IK2S4UGC2"};
		}
		return {result:result};
	};
	AskOpenPrj.jaxId="1IK2S4UGP0"
	AskOpenPrj.url="AskOpenPrj@"+agentURL
	
	segs["OpenIDE"]=OpenIDE=async function(input){//:1IK2S9VEK0
		let result=input
		/*#{1IK2S9VEK0Code*/
		//Open it in IDE:
		let startURL=`${document.location.origin}/@tabedit?path=${encodeURIComponent(diskName)}`;
		if(window.openTabOSAppPage){
			window.openTabOSAppPage(startURL);
		}else{
			window.open(startURL);
		}
		result={result:"Finish",content:"Project created, and opened in an new IDE."};
		/*}#1IK2S9VEK0Code*/
		return {result:result};
	};
	OpenIDE.jaxId="1IK2S9VEK0"
	OpenIDE.url="OpenIDE@"+agentURL
	
	segs["Exit"]=Exit=async function(input){//:1IK2SAA710
		let result=input
		/*#{1IK2SAA710Code*/
		result={result:"Finish",content:"Project created."};
		/*}#1IK2SAA710Code*/
		return {result:result};
	};
	Exit.jaxId="1IK2SAA710"
	Exit.url="Exit@"+agentURL
	
	agent={
		isAIAgent:true,
		session:session,
		name:"PrjCreateDevPrj",
		url:agentURL,
		autoStart:true,
		jaxId:"1IK2OCGG60",
		context:context,
		livingSeg:null,
		execChat:async function(input/*{diskId,diskName}*/){
			let result;
			parseAgentArgs(input);
			/*#{1IK2OCGG60PreEntry*/
			/*}#1IK2OCGG60PreEntry*/
			result={seg:Start,"input":input};
			/*#{1IK2OCGG60PostEntry*/
			/*}#1IK2OCGG60PostEntry*/
			return result;
		},
		/*#{1IK2OCGG60MoreAgentAttrs*/
		/*}#1IK2OCGG60MoreAgentAttrs*/
	};
	/*#{1IK2OCGG60PostAgent*/
	/*}#1IK2OCGG60PostAgent*/
	return agent;
};
/*#{1IK2OCGG60ExCodes*/
/*}#1IK2OCGG60ExCodes*/

//#CodyExport>>>
//#CodyExport<<<
/*#{1IK2OCGG60PostDoc*/
/*}#1IK2OCGG60PostDoc*/


export default PrjCreateDevPrj;
export{PrjCreateDevPrj};
/*Cody Project Doc*/
//{
//	"type": "docfile",
//	"def": "DocAIAgent",
//	"jaxId": "1IK2OCGG60",
//	"attrs": {
//		"editObjs": {
//			"jaxId": "1IK2OCGG61",
//			"attrs": {
//				"PrjCreateDevPrj": {
//					"type": "objclass",
//					"def": "ObjClass",
//					"jaxId": "1IK2OCGG67",
//					"attrs": {
//						"exportType": "UI Data Template",
//						"constructArgs": {
//							"jaxId": "1IK2OCGG70",
//							"attrs": {}
//						},
//						"superClass": "",
//						"properties": {
//							"jaxId": "1IK2OCGG71",
//							"attrs": {}
//						},
//						"functions": {
//							"jaxId": "1IK2OCGG72",
//							"attrs": {}
//						},
//						"mockupOnly": "false",
//						"nullMockup": "false",
//						"exportClass": "false"
//					},
//					"mockups": {}
//				}
//			}
//		},
//		"agent": {
//			"jaxId": "1IK2OCGG62",
//			"attrs": {}
//		},
//		"entry": "Start",
//		"autoStart": "true",
//		"inBrowser": "true",
//		"debug": "true",
//		"apiArgs": {
//			"jaxId": "1IK2OCGG63",
//			"attrs": {
//				"diskId": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1IK2P0N7D0",
//					"attrs": {
//						"type": "Auto",
//						"mockup": "\"\"",
//						"desc": ""
//					}
//				},
//				"diskName": {
//					"type": "object",
//					"def": "AgentCallArgument",
//					"jaxId": "1IK2P0N7D1",
//					"attrs": {
//						"type": "Auto",
//						"mockup": "\"\"",
//						"desc": ""
//					}
//				}
//			}
//		},
//		"localVars": {
//			"jaxId": "1IK2OCGG64",
//			"attrs": {
//				"tty": {
//					"type": "auto",
//					"valText": "null"
//				}
//			}
//		},
//		"context": {
//			"jaxId": "1IK2OCGG65",
//			"attrs": {}
//		},
//		"globalMockup": {
//			"jaxId": "1IK2OCGG66",
//			"attrs": {}
//		},
//		"segs": {
//			"attrs": [
//				{
//					"type": "aiseg",
//					"def": "tryCatch",
//					"jaxId": "1IK2RV2SP0",
//					"attrs": {
//						"id": "Start",
//						"viewName": "",
//						"label": "",
//						"x": "80",
//						"y": "360",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IK2S287L0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IK2S287L1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IK2S287H0",
//							"attrs": {
//								"id": "Try",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IK2RBN550"
//						},
//						"catchlet": {
//							"jaxId": "1IK2S287H1",
//							"attrs": {
//								"id": "Catch",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IK2RVNMD0"
//						}
//					},
//					"icon": "trycatch.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1IK2RBN550",
//					"attrs": {
//						"id": "CreateTTY",
//						"viewName": "",
//						"label": "",
//						"x": "265",
//						"y": "300",
//						"desc": "这是一个AISeg。",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IK2RCNNG0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IK2RCNNG1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IK2RC6560",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IK2RF0FP0"
//						},
//						"result": "#input"
//					},
//					"icon": "tab_css.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "output",
//					"jaxId": "1IK2RF0FP0",
//					"attrs": {
//						"id": "TipCheckOut",
//						"viewName": "",
//						"label": "",
//						"x": "495",
//						"y": "300",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IK2RJOP22",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IK2RJOP23",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"text": {
//							"type": "string",
//							"valText": "Downloading project content...",
//							"localize": {
//								"EN": "Downloading project content...",
//								"CN": "下载项目内容……"
//							},
//							"localizable": true
//						},
//						"outlet": {
//							"jaxId": "1IK2RJOOU1",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IK2RE3MV0"
//						}
//					},
//					"icon": "hudtxt.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1IK2RE3MV0",
//					"attrs": {
//						"id": "CheckOutDisk",
//						"viewName": "",
//						"label": "",
//						"x": "735",
//						"y": "300",
//						"desc": "这是一个AISeg。",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IK2RJOP20",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IK2RJOP21",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IK2RJOOU0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IK2RFIAF0"
//						},
//						"result": "#input"
//					},
//					"icon": "tab_css.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "output",
//					"jaxId": "1IK2RFIAF0",
//					"attrs": {
//						"id": "TipFilterJSON",
//						"viewName": "",
//						"label": "",
//						"x": "985",
//						"y": "300",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IK2RJOP24",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IK2RJOP25",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"text": {
//							"type": "string",
//							"valText": "Updating configuration file...",
//							"localize": {
//								"EN": "Updating configuration file...",
//								"CN": "更新配置文件……"
//							},
//							"localizable": true
//						},
//						"outlet": {
//							"jaxId": "1IK2RJOOU2",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IK2RHL740"
//						}
//					},
//					"icon": "hudtxt.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1IK2RHL740",
//					"attrs": {
//						"id": "FilterJSON",
//						"viewName": "",
//						"label": "",
//						"x": "1240",
//						"y": "300",
//						"desc": "这是一个AISeg。",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IK2RJOP26",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IK2RJOP27",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IK2RJOOU3",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IK2RJ3LR0"
//						},
//						"result": "#input"
//					},
//					"icon": "tab_css.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "brunch",
//					"jaxId": "1IK2RJ3LR0",
//					"attrs": {
//						"id": "CheckSetupScript",
//						"viewName": "",
//						"label": "",
//						"x": "1480",
//						"y": "300",
//						"desc": "这是一个AISeg。",
//						"codes": "true",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IK2RJOP28",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IK2RJOP29",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IK2RJOOU5",
//							"attrs": {
//								"id": "Default",
//								"desc": "输出节点。",
//								"output": ""
//							},
//							"linkedSeg": "1IK2S4UGP0"
//						},
//						"outlets": {
//							"attrs": [
//								{
//									"type": "aioutlet",
//									"def": "AIConditionOutlet",
//									"jaxId": "1IK2RJOOU4",
//									"attrs": {
//										"id": "FindScript",
//										"desc": "输出节点。",
//										"output": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IK2RJOP210",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IK2RJOP211",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"condition": "#!!setup"
//									},
//									"linkedSeg": "1IK2RKCBN0"
//								}
//							]
//						}
//					},
//					"icon": "condition.svg",
//					"reverseOutlets": true
//				},
//				{
//					"type": "aiseg",
//					"def": "aiBot",
//					"jaxId": "1IK2RKCBN0",
//					"attrs": {
//						"id": "SetupScript",
//						"viewName": "",
//						"label": "",
//						"x": "1765",
//						"y": "245",
//						"desc": "调用其它AI Agent，把调用的结果作为输出",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"context": {
//							"jaxId": "1IK2RUJDA0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IK2RUJDA1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"source": "ai/PrjTabOSPrjSetup.js",
//						"argument": "{\"dirPath\":\"#\\\"/\\\"+diskName\",\"setupType\":\"setupPrj\"}",
//						"secret": "false",
//						"outlet": {
//							"jaxId": "1IK2RUJD70",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							},
//							"linkedSeg": "1IK2S4UGP0"
//						}
//					},
//					"icon": "agent.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "output",
//					"jaxId": "1IK2RVNMD0",
//					"attrs": {
//						"id": "TipError",
//						"viewName": "",
//						"label": "",
//						"x": "265",
//						"y": "420",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "flag.svg",
//						"context": {
//							"jaxId": "1IK2S287L2",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IK2S287L3",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"role": "Assistant",
//						"text": "#input",
//						"outlet": {
//							"jaxId": "1IK2S287H2",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							}
//						}
//					},
//					"icon": "hudtxt.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "askMenu",
//					"jaxId": "1IK2S4UGP0",
//					"attrs": {
//						"id": "AskOpenPrj",
//						"viewName": "",
//						"label": "",
//						"x": "2005",
//						"y": "315",
//						"desc": "这是一个AISeg。",
//						"codes": "false",
//						"mkpInput": "$$input$$",
//						"segMark": "None",
//						"prompt": {
//							"type": "string",
//							"valText": "Development project has been created, do you want to open it in the IDE?",
//							"localize": {
//								"EN": "Development project has been created, do you want to open it in the IDE?",
//								"CN": "开发项目工程已创建，是否在IDE里打开工程？"
//							},
//							"localizable": true
//						},
//						"multi": "false",
//						"withChat": "false",
//						"outlet": {
//							"jaxId": "1IK2S9NC90",
//							"attrs": {
//								"id": "ChatInput",
//								"desc": "输出节点。",
//								"codes": "false"
//							}
//						},
//						"outlets": {
//							"attrs": [
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IK2S4UGC0",
//									"attrs": {
//										"id": "Open",
//										"desc": "输出节点。",
//										"text": {
//											"type": "string",
//											"valText": "Open project in IDE",
//											"localize": {
//												"EN": "Open project in IDE",
//												"CN": "在IDE中打开工程"
//											},
//											"localizable": true
//										},
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IK2S9NCB0",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IK2S9NCB1",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IK2S9VEK0"
//								},
//								{
//									"type": "aioutlet",
//									"def": "AIButtonOutlet",
//									"jaxId": "1IK2S4UGC2",
//									"attrs": {
//										"id": "Exit",
//										"desc": "输出节点。",
//										"text": {
//											"type": "string",
//											"valText": "Exit without opening project",
//											"localize": {
//												"EN": "Exit without opening project",
//												"CN": "退出，不打开工程"
//											},
//											"localizable": true
//										},
//										"result": "",
//										"codes": "false",
//										"context": {
//											"jaxId": "1IK2S9NCB2",
//											"attrs": {
//												"cast": ""
//											}
//										},
//										"global": {
//											"jaxId": "1IK2S9NCB3",
//											"attrs": {
//												"cast": ""
//											}
//										}
//									},
//									"linkedSeg": "1IK2SAA710"
//								}
//							]
//						},
//						"silent": "false"
//					},
//					"icon": "menu.svg",
//					"reverseOutlets": true
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1IK2S9VEK0",
//					"attrs": {
//						"id": "OpenIDE",
//						"viewName": "",
//						"label": "",
//						"x": "2275",
//						"y": "240",
//						"desc": "这是一个AISeg。",
//						"mkpInput": "$$input$$",
//						"segMark": "flag.svg",
//						"context": {
//							"jaxId": "1IK2SAUJI0",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IK2SAUJI1",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IK2SAUJE0",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							}
//						},
//						"result": "#input"
//					},
//					"icon": "tab_css.svg"
//				},
//				{
//					"type": "aiseg",
//					"def": "code",
//					"jaxId": "1IK2SAA710",
//					"attrs": {
//						"id": "Exit",
//						"viewName": "",
//						"label": "",
//						"x": "2275",
//						"y": "345",
//						"desc": "这是一个AISeg。",
//						"mkpInput": "$$input$$",
//						"segMark": "flag.svg",
//						"context": {
//							"jaxId": "1IK2SAUJI2",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"global": {
//							"jaxId": "1IK2SAUJI3",
//							"attrs": {
//								"cast": ""
//							}
//						},
//						"outlet": {
//							"jaxId": "1IK2SAUJE1",
//							"attrs": {
//								"id": "Result",
//								"desc": "输出节点。"
//							}
//						},
//						"result": "#input"
//					},
//					"icon": "tab_css.svg"
//				}
//			]
//		},
//		"desc": "这是一个AI智能体。",
//		"exportAPI": "false",
//		"exportAddOn": "false",
//		"addOnOpts": ""
//	}
//}