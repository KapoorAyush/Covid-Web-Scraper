
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
  
    let t = new Date(); 
    let hour = t.getHours(); 
    let min = t.getMinutes(); 
    let sec = t.getSeconds(); 
    am_pm = "AM"; 

    if (hour > 12) { 
        hour -= 12; 
        am_pm = "PM"; 
    } 
    if (hour == 0) { 
        hr = 12; 
        am_pm = "AM"; 
    } 

    hour = hour < 10 ? "0" + hour : hour; 
    min = min < 10 ? "0" + min : min; 
    sec = sec < 10 ? "0" + sec : sec; 

    let time = hour + ":"  
        + min + ":" + sec + am_pm; 
    time="Last Refreshed on "+time;
    document.getElementById("lastRefresh").innerHTML = time;
    
  
  
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        
        <div id="points">
          <h2 >Active Cases  :  <span id="h21">{this.state.active}</span></h2>
          <h2 >Discharged Cases  :  <span id="h22">{this.state.discharged}</span></h2>
          <h2 >Death Cases  :  <span id="h23">{this.state.deaths}</span></h2>
        </div>
        <div id="lastRefresh"></div>
        <input type="submit" value="Refresh" className="btn btn-outline-dark" id="submitButton"/>
      </form>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);
