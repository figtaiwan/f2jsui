var React    =require("react"      );
var ForthCode=require("./forthcode");
var JsCode   =require("./jscode"   );
var OutputLog=require("./outputlog");
var transpile=require("../../forthtranspiler").transpile;
var Base64=require("./base64");
var maincomponent = React.createClass({
  getInitialState:function() {
    return {code:"javascript transpiled code here"};
  }
  ,embeddedSourceMap:function(jscode,sourcemap) {
    return jscode+"//# sourceMappingURL=data:application/json;base64,"+Base64.encode(sourcemap);
  }
  ,injectScript:function(jscode,sourcemap) {
     var blob = new Blob([this.embeddedSourceMap(jscode,sourcemap)], {type: 'text/javascript'}),
      // create a script element
      script = document.createElement('script'),
      // turn the blob into a url
      url = URL.createObjectURL(blob);
      script.src = url;
      console.log(url)
      script.setAttribute("name", "javascript dynamic script");
      // add the script to the end of the head section
      document.head.appendChild(script);
  }
  ,onForth:function(input) {
    var res=transpile.transpile(input,"input.f","output.js");
    this.injectScript(res.js+"\nconsole.log('hi')",res.sourcemap.toString());
    this.setState({code:res.js})
  }
  ,render: function() {

    return <div>
      <ForthCode onForth={this.onForth}/>
      <JsCode code={this.state.code}/>
      <OutputLog/>
    </div>;
  }
});
module.exports=maincomponent;