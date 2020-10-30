
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {active: '',discharged:'',deaths:''};

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(event) {
    var xhr = new XMLHttpRequest();
    var z = this;
      
    xhr.open('post', '/api/scrap', true);
      
    xhr.onload = function () {
      var details = JSON.parse(this.response)
      
      z.setState({active: `${details.active}`,discharged:`${details.discharged}`,deaths:`${details.deaths}`})
    };

    xhr.send();
    
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        
        <div id="points">
          <h2 >Active Cases  :  <span id="h21">{this.state.active}</span></h2>
          <h2 >Discharged Cases  :  <span id="h22">{this.state.discharged}</span></h2>
          <h2 >Death Cases  :  <span id="h23">{this.state.deaths}</span></h2>
        </div>
        <input type="submit" value="Refresh" className="btn btn-outline-dark" id="submitButton"/>
      </form>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);
