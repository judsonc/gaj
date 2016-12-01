import React, {Component} from 'react'
import {Step,Stepper,StepLabel,} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import '../assets/styleQuiz.css';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
// import perguntas from './perguntas';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {refQuestionarios, fb} from './firebase.js'

var chamarRef = function(ref) {
    return ref.once('value')
}

var salvarRef = function(ref, save) {
    ref.once('value',function(snapshot){
        save = snapshot.val()
    })
}

//injectTapEventPlugin();
var Perguntas ={
    P1: "1° Pergunta",
    P2: "2° Pergunta",
    P3: "3° Pergunta",
};


var jsonbanco = {
  "data": {
    "criacao": 1478919847072,
    "criacaoReverso": -1478919847072,
    "ultimaAlteracao": 1478919847072,
    "ultimaAlteracaoReverso": -1478919847072
  },
  "perguntas": {
    "-KWLFdQyWg7rPthdEFTc": {
      "conteudo": "Conteúdo da pergunta1?",
      "ordem": 1,
      "respostas": [
        "opcao 0",
        "opcao 1",
        "opcao 2"
      ],
      "temOutraResposta": false,
      "tipo": "radio"
    },
    "-KWLFm-IqDbthXbKvdKz": {
      "conteudo": "Conteúdo da pergunta2?",
      "ordem": 2,
      "respostas": [
        "opcao 0",
        "opcao 1",
        "opcao 2",
        "opcao 33"
      ],
      "temOutraResposta": true,
      "tipo": "checkbox"
    },
    "-KWLFm-IqDbthXbK000": {
      "conteudo": "Conteúdo da pergunta3?",
      "ordem": 3,
      "respostas": [
        "opcao 0",
        "opcao 1",
        "opcao 2",
        "opcao 33"
      ],
      "temOutraResposta": false,
      "tipo": "checkbox"
    }
  },
  "titulo": "Titulo do Questionário x"
};

function tratarPerguntas(jsonbanco) {
  var perguntasArray = []
  for (var perguntaKey in jsonbanco['perguntas']) {
    // console.log(perguntaKey)
    var perguntaId = jsonbanco['perguntas'][perguntaKey]
    perguntasArray[perguntaId.ordem] = perguntaId;
  }
  return perguntasArray
}



// var perguntasQuiz = perguntasArray;
/*
var respostaPerguntas1;
var respostaPerguntas2;
var respostaPerguntas3;
*/

//var perguntasQuiz=[pergunta1,pergunta2,pergunta3];

const styles = {
   block: {
    maxWidth: 250,
  },
  checkbox: {
    
  },
  radioButton: {
    
  },
  toggle: {
   
  },

};
function tipoPergunta(Pergunta){
        
        if(Pergunta.tipo==="checkbox"){
          var listPerguntas = Pergunta.respostas.map(function(perguntas) {
              return(
                <Checkbox 
                    label={perguntas}
                    style={styles.checkbox}
                />
              )
          })
          return(
            <div> 
              {listPerguntas}
              {Pergunta.temOutraResposta? 
                <TextField
                    fullWidth={true}
                    hintText="Outra resposta"
                /> :''
              } 
            </div>
          );
        }
        else if(Pergunta.tipo ==="radio"){
          var listPerguntas = Pergunta.respostas.map(function(perguntas) {  
            return(   
                <RadioButton 
                  value={perguntas}
                  label={perguntas}
                  style={styles.radioButton}                    
              />
            )              
          })
          return(
              <div>
                    <RadioButtonGroup>
                      {listPerguntas}
                    </RadioButtonGroup>
                  
                  {Pergunta.temOutraResposta? 
                    <TextField
                      fullWidth={true}
                      hintText="Outra resposta"
                  /> :''
                  }
              </div>
          )
        }else if(Pergunta.tipo==="toggle"){
            return(
              <SimNao data={Pergunta.respostas}/>
            )
        }
    }

/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
export default class Quiz extends Component {
  constructor(props){
        super(props)
        //perguntasQuiz = this.props.route.perguntasQuiz
        this.fullScreen()
        this.state = {
          finished: false,
          stepIndex: 0,
          perguntasQuiz: tratarPerguntas(jsonbanco)
        }
    }
    fullScreen() {
		document.getElementsByTagName("html")[0].className = "telaCheia"
		document.getElementsByTagName("body")[0].className = "telaCheia"
		document.getElementById("root").className = "telaCheia"    
	}

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({
      stepIndex: stepIndex - 1,
      finished: stepIndex >= 2,
    });
  }
    
  };
  getStepContent(stepIndex) {
    if(stepIndex<3){
      return (
        <h4>{this.state.perguntasQuiz[stepIndex].conteudo}</h4>
      );
    }
    return (
      <div>
          <h4>Obrigado Por responder o quiz!!</h4>
      </div>
    );
    
  };
  getStepInt(ordem){
    if(ordem===this.setState.stepIndex){
        return true;
    }
  }
   

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {padding: "5px"};
    return (
      <div className="telaQuiz telaCheia">
        
        <div className="telaCheia" style={contentStyle}>
            
            <div className="">
              <form action="ambiente" className="telaCheia" method="get">
                <div className="alinhamento">
                  <h2>
                  {jsonbanco.titulo}
                  </h2>
                  
                  {this.getStepContent(2)}
                </div>
                <div className={stepIndex===0 ? 'caixa' : 'disp' }>
                  {tipoPergunta(this.state.perguntasQuiz[1])}                    
                </div>
                <div className={stepIndex===1 ? 'caixa' : 'disp' }>
                  {tipoPergunta(this.state.perguntasQuiz[2])}                    
                </div>
                <div className={stepIndex===2 ? 'caixa' : 'disp' }>
                  {tipoPergunta(this.state.perguntasQuiz[3])}                    
                </div>
                
                <div className="stepps">
                  <Stepper activeStep={stepIndex}>
                    <Step>
                      <StepLabel>{stepIndex === 0 ?  '1º Pergunta':''}</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>{stepIndex === 1 ?  '2º Pergunta':''}</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>{stepIndex === 2 ?  '3º Pergunta':''}</StepLabel>
                    </Step>
                  </Stepper>
                </div>  
                {!finished ?
                  ( 
                  <div style={{marginTop: 12}}>
                    <RaisedButton
                      label="Voltar"
                      disabled={stepIndex === 0}
                      onTouchTap={this.handlePrev}
                      style={{marginRight: 12}}
                      fullWidth={true}
                    />
                    <RaisedButton style={{marginTop: 12}}
                      label="Proximo"
                      primary={true}
                      onTouchTap={this.handleNext}
                      fullWidth={true}
                      type={finished? 'submit':'button' }
                    />
                  
                </div>
                ) : (
                  <div className="" style={{marginTop: 12}}>
                    <RaisedButton
                      label="Voltar"
                      onTouchTap={this.handlePrev}
                      style={{marginRight: 12}}
                      fullWidth={true}
                    />
                    <RaisedButton style={{marginTop: 12}}
                      label="Enviar"
                      primary={true}
                      type="submit"
                      fullWidth={true}
                    />
                  
                </div>
                )}
              </form>
            </div>
        </div>
      </div>
    );
  }
}


class CheckBox extends Component {
    constructor(props) {
	  super(props);
	  this.state = {
          perguntas:[]
        };
	  }
    render() {
        var listPerguntas = this.props.data.map(function(perguntas) {
            
            return(
                <div>
                    <Checkbox 
                        label={perguntas}
                        style={styles.checkbox}
                    />
                </div>
            )
        })
        return <div>{listPerguntas}</div> ;
    }
 }
 
 class SimNao extends Component {
     constructor(props) {
	  super(props);
	  this.state = {
          perguntas:[]
        };
	}
    render() {
        var listPerguntas = this.props.data.map(function(perguntas) {
            
              return(   
                  <RadioButton 
                    value={perguntas}
                    label={perguntas}
                    style={styles.radioButton}                    
                />
            )
            
        })
        return {listPerguntas};
    }
 }
 