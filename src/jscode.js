var React=require("react");
var JsCode=React.createClass({
	componentWillReceiveProps:function(nextProps) {
		console.log(nextProps);
	}
	,componentDidMount:function() {
		this.refs.jscode.getDOMNode().contentEditable=true;
	}
	,render:function() {
		return <div ref="jscode" style={{whiteSpace:"pre"}}>{this.props.code}</div>
	}
});

module.exports=JsCode;