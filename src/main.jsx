var React    =require("react"      );
var ForthCode=require("./forthcode");
var JsCode   =require("./jscode"   );
var OutputLog=require("./outputlog");
var transpile=require("../../forthtranspiler").transpile;
var Base64=require("./base64");
var maincomponent = React.createClass({
  getInitialState:function() {
    return {code:"", out:""};
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
  ,onF2Js:function(input) {
    var res=transpile.transpile(input,"input.f","output.js"), out=this.state.out;
    out+=(out?'\n':'')+'inp: <inp>'+input+'</inp>';
//  this.injectScript(res.js+"\nconsole.log('hi')",res.sourcemap.toString());
    this.injectScript("console.log('hi, forth code has been just transpiled to js code')",res.sourcemap.toString());
    this.setState({code:res.js,out:out});
  }
  ,onRunJs:function() {
    var res=eval(this.state.code), out=this.state.out;
    out+=(out?'\n':'')+'out: '+JSON.stringify(res.out)+'\nstack: <ok>'+JSON.stringify(res.stack)+'</ok>';
    this.setState({out:out})
  }
  ,render: function() {
    return <div>
      ForthCode:<br/>
      <ForthCode onF2Js={this.onF2Js} onRunJs={this.onRunJs}/>
      JsCode:<br/>
      <JsCode code={this.state.code}/>
      OutputLog:<br/>
      <OutputLog out={this.state.out}/>
    </div>;
  }
});
module.exports=maincomponent;