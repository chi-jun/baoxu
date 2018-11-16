
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead(["wx-view { display: block; }\n.",[1],"lable-container { text-align: center; padding-top: 48%; width: 100%; }\n",],undefined,{path:"./pages/login/login.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/login/login.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      