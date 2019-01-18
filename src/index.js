const _ = global._ =  require('lodash')
const Color = global.Color = require('color')
const React = require('react')
const ReactDOM = require('react-dom')
const {Render} = require('./visor')
const debounce = require('lodash/debounce')
const copy = require('copy-text-to-clipboard');
const swal = require('sweetalert');


var tur = "hex";

const updateHASHLink = debounce(function updateHASHLink (txt) {
  var _document, _document$location;
  (_document = document) == null ? void 0 : (_document$location = _document.location) == null ? void 0 : _document$location.hash = txt;
}, 200)

class App extends React.Component {
  constructor (props) {
    super(props)

    const color = document.location.hash === '' ? Color.rgb(_.random(0, 255), _.random(0, 255), _.random(0, 255)).hex() : Color(document.location.hash).hex()

    updateHASHLink(color)

    this.state = {
      theme: {
        color,
        colorTextLight: '#FFF',
        colorTextDark: '#000'
      },
      paletteView: false,
      colorPickerVisible: false,
    }

    this.inputColor = null
  }

  componentWillMount () {
    window.onhashchange = () => {
       // do something awesome here
        this.updateColor(Color(document.location.hash).hex())
    }
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 32) {
        this.randomColor()
      }
    })
  }

  handleAddColor = () => {
    this.setState(({colors, theme: { color }}) => {

      return {
        paletteView: true,
        colors: [
          ...colors,
          color
        ]
      }

    })
  }

  updateColor = (color) => {
    updateHASHLink(color)

    this.setState((state) => ({
      theme: {
        ...state.theme,
        color
      }
    }))
  }

  randomColor = () => {
    this.updateColor(Color.rgb(_.random(0, 255), _.random(0, 255), _.random(0, 255)).hex())
  }

  handleChangeColor = (event) => {
    const newColor = event.target.value

    this.updateColor(newColor)
  }

  handleToggleColorPicker = () => {
      this.setState(({colorPickerVisible}) => ({colorPickerVisible: !colorPickerVisible}))
  }

  EditColor = () => {
    console.log(this.refs)
    this.refcolor.click()
  }

  handleToggleViewPalette = () => {
    this.setState(({paletteView}) => ({
      paletteView: !paletteView
    }))
  }


    codecopy = () => {
      //copy('🦄🌈');
		var copytxt = this.state.theme.color //#hex
		if(tur=="rgb")
		{
			copytxt=Color(copytxt).rgb().toString();
		}
		else if(tur == "cmyk")
        {
			copytxt = "cmyk("+Color(copytxt).cyan().toFixed()+", "+Color(copytxt).magenta().toFixed()+", "+Color(copytxt).yellow().toFixed()+", "+Color(copytxt).black().toFixed()+")"
        }
		else if(tur == "hsv")
        {
			copytxt = "hsv("+Color(copytxt).hue().toFixed()+", "+Color(copytxt).saturationv().toFixed()+", "+Color(copytxt).value().toFixed()+")"
        }
		else if(tur == "hsl")
        {
			copytxt = "hsl("+Color(copytxt).hue().toFixed()+", "+Color(copytxt).saturationl().toFixed()+", "+Color(copytxt).lightness().toFixed()+")"
        }

	copy(copytxt);
	//swal('Hello world!');
	swal({
	  title: 'Renk Kodu Kopyalandı',
	  button: {
		text: "Tamam",
		closeModal: true,
	  },
	   //button : false,
	   icon: "success",
	   timer: 2000
	});
  }


    turcevir =() =>{

        if (tur == "hex") {
            tur="rgb";
        }
        else if(tur == "rgb")
        {
          tur ="cmyk";
        }
		else if(tur == "cmyk")
        {
          tur ="hsv";
        }
		else if(tur == "hsv")
        {
          tur ="hsl";
        }
        else
        {
          tur ="hex";
        }

        this.setState(({tur}) => ({
            tur: !tur
        }))
				

    }


    renkgir =() => {


        swal(tur.toUpperCase()+" Değeri Gir:", {
            content: "input",
            button: {
                text: "Tamam"
            }
        })
            .then((deger) => {

                var hex  = deger.indexOf("#");
                var rgb  = deger.indexOf("rgb");
                var cmyk = deger.indexOf("cmyk");
                var hsl  = deger.indexOf("hsl");
                var hsv  = deger.indexOf("hsv");

                //eskisi tur=="hex"  gibiyken şimdi hex>-1

                if(hex>-1)
                {
                    this.updateColor(Color.rgb(deger).hex())
                }
                else if(rgb>-1)
                {
                    deger = deger.substr(4);
                    deger = deger.substr(0,deger.length-1);
                    var kes = deger.split(",");
                       this.updateColor(Color.rgb(parseInt(kes[0]),parseInt(kes[1]),parseInt(kes[2])).hex())
                }
                else if(cmyk>-1)
                {
                    deger = deger.substr(5);
                    deger = deger.substr(0,deger.length-1);
                    var kes = deger.split(",");
                    this.updateColor(Color.cmyk(parseInt(kes[0]),parseInt(kes[1]),parseInt(kes[2]),parseInt(kes[3])).hex())
                }
                else if(hsv>-1)
                {
                    deger = deger.substr(4);
                    deger = deger.substr(0,deger.length-1);
                    var kes = deger.split(",");
                    this.updateColor(Color.hsv(parseInt(kes[0]),parseInt(kes[1]),parseInt(kes[2])).hex())
                }
                else if(hsl>-1)
                {
                    deger = deger.substr(4);
                    deger = deger.substr(0,deger.length-1);
                    var kes = deger.split(",");
                    this.updateColor(Color.hsl(parseInt(kes[0]),parseInt(kes[1]),parseInt(kes[2])).hex())
                }


            })

    }


  render () {
    return (
      <Render
        paletteView={this.state.paletteView}
        theme={this.state.theme}
        randomColor={this.randomColor}
        updateColor={this.updateColor}
        handleAddColor={this.handleAddColor}
        colorPickerVisible={this.state.colorPickerVisible}
        handleToggleColorPicker={this.handleToggleColorPicker}
        codecopy={this.codecopy}
        turcevir={this.turcevir}
        tur ={tur}
        renkgir={this.renkgir}
        handleToggleViewPalette={this.handleToggleViewPalette}
      />
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#app')
)
