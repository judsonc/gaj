import React, {Component} from 'react'
import {Step,Stepper,StepLabel,} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import '../assets/styleQuiz.css';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
import fb from './firebase.js'
import RefreshIndicator from 'material-ui/RefreshIndicator'

var Perguntas ={
    P1: "1° Pergunta",
    P2: "2° Pergunta"
};
// //  var refQuestionarios = fb.ref('questionarios') ;
// //  console.log(refQuestionarios);
// //.var jsonbanco = {};
var jsonbanco = {}
var perguntasQuiz = []
// var jsonbanco = {
//   "data": {
//     "criacao": 1478919847072,
//     "criacaoReverso": -1478919847072,
//     "ultimaAlteracao": 1478919847072,
//     "ultimaAlteracaoReverso": -1478919847072
//   },
//   "perguntas": {
//     "-KWLFdQyWg7rPthdEFTc": {
//       "conteudo": "Conteúdo da pergunta 1?",
//       "ordem": 1,
//       "respostas": [
//         "opcao 0"
//       ],
//       "temOutraResposta": false,
//       "tipo": "radio"
//     },
//     "-KWLFm-IqDbthXbKvdKz": {
//       "conteudo": "Conteúdo da pergunta 2?",
//       "ordem": 2,
//       "respostas": [
//         "opcao 0",
//         "opcao 1",
//         "opcao 2",
//         "opcao 3"
//       ],
//       "temOutraResposta": true,
//       "tipo": "checkbox"
//     },
//     "-KWLFm-IqDbthXbKvd33": {
//       "conteudo": "Conteúdo da pergunta?",
//       "ordem": 2,
//       "respostas": [
//         "opcao 0",
//         "opcao 1",
//         "opcao 2",
//         "opcao 3"
//       ],
//       "temOutraResposta": false,
//       "tipo": "checkbox"
//     }
//   },
//   "titulo": "Titulo do Questionário"
// };

// for (var perguntaKey in jsonbanco['perguntas']) {
//   var conteudoDaPergunta = jsonbanco['perguntas'][perguntaKey]
//   var perguntaArray = [
//     conteudoDaPergunta.temOutraResposta,
//     conteudoDaPergunta.respostas,
//     conteudoDaPergunta.tipo,
//     conteudoDaPergunta.conteudo
//   ]
//   perguntasQuiz[conteudoDaPergunta.ordem] = perguntaArray;
// }

const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

function tipoPergunta(Pergunta){
        let listPerguntas
        if(Pergunta[2]==="checkbox"){
          listPerguntas = Pergunta[1].map(function(perguntas) {
              return(
                <Checkbox 
                    label={perguntas}
                    
                />
              )
          })
          return(
            <div> 
              {listPerguntas}
              {Pergunta[0]? 
                <TextField
                    fullWidth={true}
                    hintText="Outra resposta"
                /> :''
              } 
            </div>
          );
        }
        else if(Pergunta[2] ==="radio"){
          listPerguntas = Pergunta[1].map(function(perguntas) {  
            return(   
                <RadioButton 
                  value={perguntas}
                  label={perguntas}
                                      
              />
            )              
          })
          return(
              <div>
                    <RadioButtonGroup name="radio">
                      {listPerguntas}
                    </RadioButtonGroup>
                  
                  {Pergunta[0]? 
                    <TextField
                      fullWidth={true}
                      hintText="Outra resposta"
                  /> :''
                  }
              </div>
          )
        }else if(Pergunta[2]==="toggle"){
            return(
              <SimNao data={Perguntas[1]}/>
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
  state = {
      finished: false,
      stepIndex: 1,
  };
  constructor(props){
        super(props)
        //perguntasQuiz = this.props.route.perguntasQuiz
        this.fullScreen()
        
        var refQuestionarios = fb.ref('questionarios')    
        this.state.refQuestionario = refQuestionarios.child('-KWLUUkfIfVl_yrLdBwU')
        this.state.perguntasQuiz = []
        
               
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
      finished: stepIndex > 1,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
        this.setState({
        stepIndex: stepIndex - 1,
        finished: false,
      });
    };
  }
    
  // salvarRef = (ref, save) => {
    
           
  // }
  componentDidMount = () => {
     //var resultado = this.salvarRef(this.state.refQuestionario, this.state.questionario);
     var self = this;
     this.state.refQuestionario.once('value', function(snapshot){
          jsonbanco = snapshot.val()
          //console.log(save);
          var perguntaArray = [];
          //jsonbanco = save
          var perguntasQuizLocal = []
          for (var perguntaKey in jsonbanco['perguntas']) {
            var conteudoDaPergunta = jsonbanco['perguntas'][perguntaKey]
            var perguntaArray = [
              conteudoDaPergunta.temOutraResposta,
              conteudoDaPergunta.respostas,
              conteudoDaPergunta.tipo,
              conteudoDaPergunta.conteudo
            ]
            //console.log(perguntaArray)
            console.log(perguntaArray)
            perguntasQuizLocal[conteudoDaPergunta.ordem] = perguntaArray;
          } 

          //self.state.perguntasQuiz = perguntasQuizLocal
          self.setState({
            perguntasQuiz: perguntasQuizLocal
          })

          //return perguntasQuizLocal;
          //console.log(JSON.stringify(save));
      }, function (err) { console.log(err)} ) 

     
  }
  getStepContent = (stepIndex)=>{
    //console.log(perguntasQuiz)
    if(stepIndex<=2)
      return this.state.perguntasQuiz[stepIndex][3];
    else
       return "Obrigado Por responder o quiz!!";
  };
  getStepInt=(ordem)=>{
    if(ordem===this.setState.stepIndex){
        return true;
    }
  }
   

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {padding: "5px"};
    return (
      <div className="telaQuiz telaCheia">
        {this.state.perguntasQuiz.length? (
        <div className="telaCheia" style={contentStyle}>
            
            <div className="">
              <form action="ambiente" className="telaCheia" method="get">
                <div className="alinhamento">
                  <h2>
                  {jsonbanco.titulo}
                  </h2>
                  
                  <h4>{this.getStepContent(stepIndex)}</h4>
                </div>
                <div className={stepIndex===1 ? 'caixa' : 'disp' }>
                  {tipoPergunta(this.state.perguntasQuiz[1])}                    
                </div>
                <div className={stepIndex===2 ? 'caixa' : 'disp' }>
                  {tipoPergunta(this.state.perguntasQuiz[2])}                    
                </div>
                
                <div className="stepps">
                  <Stepper activeStep={stepIndex}>
                    <Step>
                      <StepLabel>{stepIndex === 1 ?  '1º Pergunta':''}</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>{stepIndex === 2 ?  '2º Pergunta':''}</StepLabel>
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
    ):
    (
      <div className="loading" >
         <span className="texte">       
          <RefreshIndicator
            size={100}
            left={10}
            top={0}
            status="loading"
            style={style.refresh}
          />
          </span>
      </div>
    )
  }
      </div>
    );
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
                                       
                />
            )
            
        })
        return {listPerguntas};
    }
 }

 