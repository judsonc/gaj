import React, {Component} from 'react'
import {hashHistory} from 'react-router'
import {Step,Stepper,StepLabel,} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import '../assets/styleQuiz.css'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
// import Toggle from 'material-ui/Toggle';
import {refRespostas, refQuestionarios} from './firebase.js'
import {Resposta} from './construtores.js'
import RefreshIndicator from 'material-ui/RefreshIndicator'

var objetoQuestionario = {}

const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
}

function renderPergunta(objetoPergunta){
    var registraRespostaRadio = function(e, indiceDaRespostaSelecionada) {
      objetoPergunta.resposta = indiceDaRespostaSelecionada
    }
    var registraRespostaString = function(e) {
      objetoPergunta.resposta = e.target.value
      // console.log(objetoPergunta.resposta)
    }
    let respostas
    if(objetoPergunta.tipo==="checkbox"){      
      respostas = objetoPergunta.respostas.map(function(resposta) {
          return(
            <Checkbox 
                label={resposta}
                id={resposta}                 
            />
          )
      })
      return(
        <div>
          {respostas}
          {objetoPergunta.temOutraResposta? 
            <TextField
                fullWidth={true}
                hintText="Outra resposta"
            /> :''
          } 
        </div>
      );
    }
    else if(objetoPergunta.tipo==="radio"){
      respostas = objetoPergunta.respostas.map(function(resposta, indice) {
        return(
            <RadioButton 
              value={indice}
              label={resposta}
            />
        )              
      })
      return(
          <div>
                <RadioButtonGroup 
                  onChange={registraRespostaRadio}
                  name="shipSpeed"
                  >
                  {respostas}
                </RadioButtonGroup>
              
              {objetoPergunta.temOutraResposta? 
                <TextField
                  fullWidth={true}
                  hintText="Outra resposta"
                /> :''
              }
          </div>
      )
    }else if(objetoPergunta.tipo==="toggle"){
        return(
          <SimNao data={objetoPergunta.respostas}/>
        )
    }else if(objetoPergunta.tipo==="string"){
        return(
          <div>
            <TextField
              fullWidth={true}
              hintText="Outros bares / restaurantes / lanchonetes."
              onChange={registraRespostaString}
            />
          </div>
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
  }
  constructor(props){
      super(props)
      //perguntasQuiz = this.props.route.perguntasQuiz
      this.fullScreen()
      // this.state = {
      //   proximo: props.route.linkDoProximo,
      //   refQuestionario: refQuestionarios.child('-KWLUUkfIfVl_yrLdBwU'),
      //   arrayPerguntas: []
      // }
      this.state.proximo = props.route.linkDoProximo
      this.state.refQuestionario = refQuestionarios.child('-KWLUUkfIfVl_yrLdBwU')
      this.state.arrayPerguntas = []
  }
  fullScreen() {
    document.getElementsByTagName("html")[0].className = "telaCheia"
    document.getElementsByTagName("body")[0].className = "telaCheia"
    document.getElementById("root").className = "telaCheia"    
  }

  handleNext = () => {
    let self = this
    var nextStep = function(){
      self.setState({
        stepIndex: self.state.stepIndex + 1,
        finished: self.state.stepIndex > 1,
      })
    }
    const {stepIndex} = this.state
    //O indice de array de perguntas começa no 0, stepIndex começa em 1.
    let indicePergunta = stepIndex - 1
    let perguntaAtual = this.state.arrayPerguntas[indicePergunta]
    //Testa se a pergunta atual foi respondida
    if (perguntaAtual.resposta!==null) {
      let resposta = new Resposta(perguntaAtual.resposta, perguntaAtual.key, perguntaAtual.keyQuestionario)
      //Procura no localStorage se a pergunta já foi respondida e salva no firebase
      let indiceRespostaSalva = 'keyDaRespostaDaPergunta' + String(indicePergunta)
      let respostaSalva = localStorage.getItem(indiceRespostaSalva)
      //Se já foi respondida, atualiza.
      if (respostaSalva) {        
        let salvarRespostaNoFirebase = refRespostas.child(respostaSalva).set(resposta)
        salvarRespostaNoFirebase.then(function() { nextStep() })
      //Se não foi, cria no firebase e seta no localStorage como respondida.
      } else {
        let salvarRespostaNoFirebase = refRespostas.push(resposta)
        salvarRespostaNoFirebase.then(function() {
          localStorage.setItem(indiceRespostaSalva, salvarRespostaNoFirebase.key)
          nextStep()
        })
        // salvarRespostaNoFirebase.catch(function(err) {console.log('Erro ao salvar resposta no firebase')})
      }
    }
  }

  handlePrev = () => {
    const {stepIndex} = this.state
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1,
        finished: false,
      });
    };
  }

  irParaProximaRota = () => {
    hashHistory.push(this.state.proximo)
  }
    
  componentDidMount = () => {
     //var resultado = this.salvarRef(this.state.refQuestionario, this.state.questionario);
     localStorage.setItem('proximaVisita','/quiz')
     var self = this;
     this.state.refQuestionario.once('value', function(snapshot){
        objetoQuestionario = snapshot.val()
        let arrayPerguntas = []
        for (let perguntaKey in objetoQuestionario['perguntas']) {
          if (perguntaKey) {
            let objetoPergunta = objetoQuestionario['perguntas'][perguntaKey]
            objetoPergunta['keyQuestionario'] = snapshot.key
            objetoPergunta['key'] = perguntaKey
            objetoPergunta['resposta'] = null
            arrayPerguntas[objetoPergunta.ordem] = objetoPergunta
          }
          
        }
        self.setState({
          arrayPerguntas: arrayPerguntas
        })
    }, function (err) { console.log(err)} )     
  }
  getStepContent = (stepIndex)=>{
    if(stepIndex<=2)
      return this.state.arrayPerguntas[stepIndex-1].conteudo
    else
       return "Obrigado Por responder o quiz!!";
  };
  getStepInt=(ordem)=>{
    if(ordem===this.setState.stepIndex-1){
        return true;
    }
  }
   

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {padding: "5px"};
    return (
      <div className="telaQuiz telaCheia">
        {this.state.arrayPerguntas.length? (
        <div className="telaCheia" style={contentStyle}>
            
            <div className="">
              <form action="ambiente" className="telaCheia" method="get">

                <div className="alinhamento">
                  <h2>
                    {objetoQuestionario.titulo}
                  </h2>             
                  <h4>{this.getStepContent(stepIndex)}</h4>
                </div>
                <div className={stepIndex===1 ? 'caixa' : 'disp' }>
                  {renderPergunta(this.state.arrayPerguntas[0])}             
                </div>
                <div className={stepIndex===2 ? 'caixa' : 'disp' }>
                  {renderPergunta(this.state.arrayPerguntas[1])}                
                </div>
                
                <div className="stepps">
                  <Stepper activeStep={stepIndex-1}>
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
                      disabled={(stepIndex -1) === 0}
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
                      onTouchTap={this.irParaProximaRota}
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
	  super(props)
	  this.state = {
          perguntas:[]
        }
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
        return {listPerguntas}
    }
 }

 