
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead(["wx-view { display: block; }\n.",[1],"content { padding: ",[0,4]," ",[0,26]," ",[0,26]," ",[0,26],"; display: -webkit-box; display: -webkit-flex; display: flex; -webkit-flex-wrap: wrap; flex-wrap: wrap; -webkit-justify-content: space-around; justify-content: space-around; }\n.",[1],"access-item { width: 46%; }\n.",[1],"access-item-inner { background: #6492FF; border-radius: ",[0,16],"; margin-top: ",[0,22],"; text-align: center; width: 100%; height: ",[0,240],"; }\n.",[1],"do-num-container { position: relative; left: ",[0,40],"; color: white; text-align: center; top: ",[0,-220.00000000000003],"; }\n.",[1],"do-num-inner { background: #F96A6A; width: ",[0,50],"; height: ",[0,50],"; line-height: ",[0,50],"; margin: 0 auto; border-radius: ",[0,25],"; font-size: ",[0,30],"; }\n.",[1],"access-title { font-size: ",[0,30],"; color: white; margin-top: ",[0,4],"; }\n.",[1],"info-outer { display: table; text-align: center; width: 100%; height: ",[0,240],"; }\n.",[1],"info-inner { display: table-cell; vertical-align: middle; }\n.",[1],"info-inner wx-image { width: ",[0,70],"; height: ",[0,70],"; }\n",],undefined,{path:"./pages/home/home.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/home/home.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      