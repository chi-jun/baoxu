
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead(["body { display: -webkit-box; display: -webkit-flex; display: flex; }\n.",[1],"index { display: -webkit-box; display: -webkit-flex; display: flex; -webkit-box-flex: 1; -webkit-flex: 1; flex: 1; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; flex-direction: column; overflow-x: hidden; overflow-y: auto; background: #DCDCDC; }\n.",[1],"index-bd { width: ",[0,750],"; height: 100%; }\n.",[1],"swiper-tab { border-top: ",[0,2]," solid #EFEFF4; background: white; width: 100%; white-space: nowrap; line-height: ",[0,64],"; }\n.",[1],"swiper-tab-list { font-size: ",[0,36],"; width: ",[0,150],"; display: inline-block; text-align: center; color: #777777; }\n.",[1],"on { color: #6492FF; border-bottom: ",[0,5]," solid #6492FF; }\n.",[1],"swiper-box { -webkit-box-flex: 1; -webkit-flex: 1; flex: 1; width: 100%; height: 100%; margin-top: ",[0,20],"; background: white; }\n.",[1],"swiper-box wx-view { text-align: center; }\n.",[1],"tab-list { width: 100%; height: ",[0,90],"; line-height: ",[0,90],"; text-align: left; border-bottom: ",[0,2]," solid #EFEFF4; }\n",],undefined,{path:"./pages/tabbar/tabbar.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/tabbar/tabbar.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      