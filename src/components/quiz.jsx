import React, {Component} from 'react'
import {hashHistory} from 'react-router'
import {Step,Stepper,StepLabel,} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import '../assets/styleQuiz.css';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import fb from './firebase.js'

var questionariosref = fb.ref('questionarios')
var perguntasref
//injectTapEventPlugin();
var Perguntas ={
    P1: "1° Pergunta",
    P2: "2° Pergunta",
    P3: "3° Pergunta",
};
var respostaP1={
    r1p1: "resp 1",
    r2p1: "resp 2",
    r3p1: "resp 1",
    r4p1: "resp 2",
}
var respostaP2={
    r1p2: "resp 5",
    r2p2: "resp 2",
}
var respostaP3={
    r1p3: "resp 1",
    r2p3: "resp 2",
    r3p3: "resp 1",
    r4p3: "resp 2",
}

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
    radioButton: {
        marginBottom: 16,
    },

};

/**
* Horizontal steppers are ideal when the contents of one step depend on an earlier step.
* Avoid using long step names in horizontal steppers.
*
* Linear steppers require users to complete one step in order to move on to the next.
*/
export default class Quiz extends Component {
    constructor(props){
        super(props)

        Perguntas.P1=this.props.route.pergunta1
        Perguntas.P2=this.props.route.pergunta2
        Perguntas.P3=this.props.route.pergunta3

        respostaP1.r1p1 = this.props.route.r1p1
        respostaP1.r2p1 = this.props.route.r2p1
        respostaP1.r3p1 = this.props.route.r3p1
        respostaP1.r4p1 = this.props.route.r4p1

        respostaP2.r1p2 = this.props.route.r1p2
        respostaP2.r2p2 = this.props.route.r2p2

        respostaP3.r1p3 = this.props.route.r1p3
        respostaP3.r2p3 = this.props.route.r2p3
        respostaP3.r3p3 = this.props.route.r3p3
        respostaP3.r4p3 = this.props.route.r4p3

    }

    componentWillMount() {
        hashHistory.push("login")
        if(localStorage.getItem('email')){
            hashHistory.push("ambiente")
        }
    }

    state = {
        finished: false,
        stepIndex: 0,
    };

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
        switch (stepIndex) {
            case 0:
            return <h3>{Perguntas.P1}</h3>;
            case 1:
            return <h3>{Perguntas.P2}</h3>;
            case 2:
            return <h3>{Perguntas.P3}</h3>;
            default:
            return (
                <div>
                    <h3>Obrigado Por responder o quiz!!</h3>
                </div>
            );
        }
    }

    render() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};
        return (
            <div className="telaQuiz">

                <div style={contentStyle}>
                    <div className="">
                        <form action="/#/video2" method="post">
                        <div className="alinhamento">
                            {this.getStepContent(stepIndex)}
                        </div>
                        <div>
                            <div className={stepIndex === 0 ? 'caixa' : 'disp' } >

                                <Checkbox
                                    label={respostaP1.r1p1}
                                    style={styles.checkbox}
                                />
                                <Checkbox
                                    label={respostaP1.r2p1}
                                    style={styles.checkbox}
                                />
                                <Checkbox
                                    label={respostaP1.r3p1}
                                    style={styles.checkbox}
                                />
                                <Checkbox
                                    label={respostaP1.r4p1}
                                    style={styles.checkbox}
                                />
                                <TextField
                                    fullWidth={true}
                                    hintText="Outra resposta"
                                />
                            </div>

                            <div className={stepIndex === 1 ? 'caixa' : 'disp'}>
                                <RadioButtonGroup name="shipSpeed" defaultSelected={respostaP2.r1p2}>
                                    <RadioButton

                                        value={respostaP2.r1p2}
                                        label={respostaP2.r1p2}
                                        style={styles.radioButton}
                                    />
                                    <RadioButton
                                        value={respostaP2.r2p2}
                                        label={respostaP2.r2p2}
                                        style={styles.radioButton}

                                    />
                                </RadioButtonGroup>
                            </div>

                            <div className={stepIndex === 2 ? 'caixa' : 'disp'}>

                                <Checkbox
                                    label={respostaP3.r1p3}
                                    style={styles.checkbox}
                                />
                                <Checkbox
                                    label={respostaP3.r2p3}
                                    style={styles.checkbox}
                                />
                                <Checkbox
                                    label={respostaP3.r3p3}
                                    style={styles.checkbox}
                                />
                                <Checkbox
                                    label={respostaP3.r4p3}
                                    style={styles.checkbox}
                                />
                                <TextField
                                    fullWidth={true}
                                    hintText="Outra resposta"
                                />
                            </div>
                        </div>
                        <div className={stepIndex > 2 ? 'caixa' : 'disp'}></div>
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
            </div>
        );
    }
}
