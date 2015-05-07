var React=require("react");
var ForthCode=React.createClass({
	genJsCode:function() {
		this.props.onF2Js(this.refs.forthcode.getDOMNode().value);
	}
	,runJsCode:function() {
		this.props.onRunJs();
	}
	,render:function() {
		return <div>
				<textarea id="fInputBox" ref="forthcode" defaultValue="1 3 + ."/><br/>
				<button onClick={this.genJsCode}>genJsCode</button>
				<button onClick={this.runJsCode}>runJsCode</button>
			</div>
	}
});

module.exports=ForthCode;