import React, {Component} from 'react'
import {hashHistory} from 'react-router'
import {Step,Stepper,StepLabel,} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import '../assets/styleQuiz.css'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import {refRespostas, refQuestionarios} from './firebase'
import {Resposta} from './construtores'
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
        respostas = objetoPergunta.respostas.map(function(resposta,i) {
            return(
                <Checkbox
                    key={i}
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
        respostas = objetoPergunta.respostas.map(function(resposta,i) {
            return(
                <RadioButton
                    key={i}
                    value={i}
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
            <TextField
                fullWidth={true}
                hintText="Outros bares / restaurantes / lanchonetes."
                onChange={registraRespostaString}
            />
        )
    }
}

class Quiz extends Component {
    constructor(props){
        super(props)
        this.state = {
            finished: false,
            stepIndex: 1,
            proximo: props.route.linkDoProximo,
            refQuestionario: refQuestionarios.child('-KWLUUkfIfVl_yrLdBwU'),
            arrayPerguntas: []
        }
    }
    handleNext = () => {
        let self = this
        var nextStep = function(){
            self.setState({
                stepIndex: self.state.stepIndex + 1,
                finished: self.state.stepIndex > 0,
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
        if(this.state.finished){
            hashHistory.push(this.state.proximo)
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

    componentDidMount = () => {
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
                        <form className="telaCheia">
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
                            <div style={{marginTop: 12}}>
                                {(stepIndex -1)?(
                                    <RaisedButton
                                        label="Voltar"
                                        disabled={(stepIndex -1) === 0}
                                        onTouchTap={this.handlePrev}
                                        style={{marginRight: 12}}
                                        fullWidth={true}
                                    />):""
                                }
                                <RaisedButton style={{marginTop: 12}}
                                    label="Avançar"
                                    primary={true}
                                    onTouchTap={this.handleNext}
                                    fullWidth={true}
                                    type={finished?"submit":"button"}
                                />
                            </div>
                        </form>
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
                )}
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
        var listPerguntas = this.props.data.map(function(perguntas,i) {
            return(
                <RadioButton
                    key={i}
                    value={perguntas}
                    label={perguntas}
                />
            )
        })
        return {listPerguntas}
    }
}

export default Quiz
