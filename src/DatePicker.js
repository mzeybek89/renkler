const {default: styled, css} = require('styled-components')
const React = require('react')
const InputRange = require('react-input-range')
const MediaQuery = require('react-responsive')
import Responsive from 'react-responsive';

const Desktop = ({ children }) => <Responsive minWidth={992} children={children} />;
const Tablet = ({ children }) => <Responsive minWidth={768} maxWidth={992} children={children} />;
const Mobile = ({ children }) => <Responsive maxWidth={768} children={children} />;
const Default = ({ children }) => <Responsive minWidth={768} children={children} />;


const LoadColorText = props => (
  Color(props.theme.color).dark()
    ? props.theme.colorTextLight
    : props.theme.colorTextDark
)

const TextColorStyle = css`
  color: ${LoadColorText};
`

const DatePickerContainer = styled.div`
  ${TextColorStyle};
  background-color: ${props=>props.theme.color};
  position: absolute;
  width: 200px;
  border: solid 1px ${LoadColorText};
  right: 235px;
  top: 40px;
  background-color: ${props=>props.color};
  z-index: 1;
  padding: 10px;
  @media (max-width: 500px) {
    display: block;
    position: relative;
    width: auto;
    right: auto;
    top: auto;
  }
`

const DatePickerLabel = styled.label`
  ${TextColorStyle};
  display: block;
  width: 100%;
  font-weight: 300;
  padding: 0px;
  margin: 0px;
`

const DatePickerLabel_kapat = styled.label`
  ${TextColorStyle};
  display: block;
  width: 100%;
  font-weight: 300;
  padding: 0px;
  margin: 0px;
  text-align:right;
`

const btn = styled.label`
 padding: 5px;
`


const DatePickerTitle = styled.h3`
  font-size: 1.4em;
  margin: 0px;
  padding:0px;
  font-weight: 100;
  text-align: center;
`

const DatePickerRange = styled.input`
  width: 100%;

  &::-webkit-slider-thumb {
    margin-top: -10px;
    width: 40px;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: ${LoadColorText};
    border-radius: 1.3px;
    border: none;
  }
`

const Lbl = styled.label`
`

class DatePicker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value,
      color: Color(props.value).color,
        showForm: true

    }
  }




  componentWillReceiveProps (nextProps) {
    if (nextProps.color !== this.state.color) {
      this.setState({
        color: Color(nextProps.value).color
      })
    }
  }

  handleChangeR = (event) => {
    const newColor = Number(event.target.value)

    if (newColor !== this.state.color[0]) {
      const color = [
        newColor,
        this.state.color[1],
        this.state.color[2],
      ]

      this.setState({ color })

      this.props.onChange && this.props.onChange( Color.rgb(color).hex() )
    }
  }

  handleChangeG = (event) => {
    const newColor = Number(event.target.value)

    if (newColor !== this.state.color[1]) {
      const color = [
        this.state.color[0],
        newColor,
        this.state.color[2],
      ]

      this.setState({ color })

      this.props.onChange && this.props.onChange( Color.rgb(color).hex() )
    }
  }

  handleChangeB = (event) => {
    const newColor = Number(event.target.value)

    if (newColor !== this.state.color[2]) {
      const color = [
        this.state.color[0],
        this.state.color[1],
        newColor,
      ]

      this.setState({ color })

      this.props.onChange && this.props.onChange( Color.rgb(color).hex() )
    }
  }


    kapat = (event) => {
        //this.setState({showForm: false});
        console.log("kapat event");
    }



    render () {
        //let durum = this.state.showForm? "block" : "none"
        let durum = "block"
      return (
          <Lbl>
            <Default>
              <DatePickerContainer>
                {/*<DatePickerLabel_kapat><btn onClick={this.kapat} style={{padding: '5px'}}>X</btn></DatePickerLabel_kapat>*/}
                <DatePickerTitle>RGB - KYM</DatePickerTitle>
                <DatePickerLabel>KIRMIZI(RED)</DatePickerLabel>
                <DatePickerRange ref={e=>this.iptr=e} type="range" onChange={this.handleChangeR} min={0} max={255} value={this.state.color[0]}/>
                <DatePickerLabel>YEŞİL(GREEN)</DatePickerLabel>
                <DatePickerRange ref={e=>this.iptg=e} type="range" onChange={this.handleChangeG} min={0} max={255} value={this.state.color[1]}/>
                <DatePickerLabel>MAVİ(BLUE)</DatePickerLabel>
                <DatePickerRange ref={e=>this.iptb=e} type="range" onChange={this.handleChangeB} min={0} max={255} value={this.state.color[2]}/>
              </DatePickerContainer>
            </Default>




            <Mobile>
              <DatePickerContainer style={{marginTop:'200px',width:'95%',position:'inherit'}}>
                  {/*<DatePickerLabel_kapat><btn onClick={this.kapat} style={{padding: '5px'}}>X</btn></DatePickerLabel_kapat>*/}
                <DatePickerTitle>RGB - KYM</DatePickerTitle>
                <DatePickerLabel>KIRMIZI(RED)</DatePickerLabel>
                <DatePickerRange ref={e=>this.iptr=e} type="range" onChange={this.handleChangeR} min={0} max={255} value={this.state.color[0]}/>
                <DatePickerLabel>YEŞİL(GREEN)</DatePickerLabel>
                <DatePickerRange ref={e=>this.iptg=e} type="range" onChange={this.handleChangeG} min={0} max={255} value={this.state.color[1]}/>
                <DatePickerLabel>MAVİ(BLUE)</DatePickerLabel>
                <DatePickerRange ref={e=>this.iptb=e} type="range" onChange={this.handleChangeB} min={0} max={255} value={this.state.color[2]}/>
              </DatePickerContainer>
            </Mobile>

          </Lbl>
      )

  }
}

// const DatePicker = function DatePicker (props) {
//   const refs = {}
// }

module.exports = {
  DatePicker,
}