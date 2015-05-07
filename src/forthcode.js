var React=require("react");
var ForthCode=React.createClass({
	sendCode:function() {
		this.props.onForth(this.refs.forthcode.getDOMNode().value);
	}
	,render:function() {
		return <div>
				<textarea ref="forthcode" defaultValue="1 3 + ."/>
				<button onClick={this.sendCode}>Transpile</button>
			</div>
	}
});

module.exports=ForthCode;