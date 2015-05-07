var React=require("react");
var OutputLog=React.createClass({
	componentWillReceiveProps:function(nextProps) {
		console.log(nextProps);
	}
	,componentDidMount:function() {
		this.refs.outputlog.getDOMNode().contentEditable=true;
	}
	,render:function() {
		return <pre id="outputBox" ref="outputlog" style={{whiteSpace:"pre"}}>{this.props.out}</pre>
	}
});

module.exports=OutputLog;