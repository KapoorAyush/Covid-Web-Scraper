
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
        <input type="submit" value="Scrap" className="btn btn-outline-dark" id="submitButton"/>
        <ul id="points">
          <li>Active : {this.state.active}</li>
          <li>Discharged :{this.state.discharged}</li>
          <li>Deaths : {this.state.deaths}</li>
        </ul>
      </form>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);