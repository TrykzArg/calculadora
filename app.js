const displayValorAnterior = document.getElementById('valor-anterior');
const displayValorActual = document.getElementById('valor-actual');
const botonesNumeros = document.querySelectorAll('.numero');
const botonesOperadores = document.querySelectorAll('.operador');

class Calculadora{
    sumar(num1, num2){
        return num1 + num2;
    }
    restar(num1, num2){
        return num1 - num2;
    }
    multiplicar(num1, num2){
        return num1 * num2;
    }
    dividir(num1, num2){
        return num1 / num2;
    }

}

const calculadora = new Calculadora();


class Display{
    constructor(displayValorAnterior, displayValorActual){
        this.displayValorActual = displayValorActual;
        this.displayValorAnterior = displayValorAnterior;
        this.calculador = new Calculadora();
        this.tipoOperacion = undefined;
        this.valorActual = '';
        this.valorAnterior = '';
        this.signos = {
            sumar: '+',
            dividir: '%',
            multiplicar: 'x',
            restar: '-'
        };
        
        }
            borrarTodo(){
                this.valorActual = '';
                this.valorAnterior = '';
                this.tipoOperacion = undefined;
                this.imprimirValores();
            }

            borrar(){
                this.valorActual = this.valorActual.toString().slice(0,-1);
                this.imprimirValores();
            }

            computar(tipo){
                this.tipoOperacion !== 'igual' && this.calcular();
                this.tipoOperacion = tipo;
                this.valorAnterior = this.valorActual || this.valorAnterior;
                this.valorActual = '';
                this.imprimirValores();
            }

            agregarNumero(numero){
                if(numero === '.' && this.valorActual.includes('.')) return
                this.valorActual = this.valorActual.toString() + numero.toString();
                this.imprimirValores();
            }

            imprimirValores(){
                if(this.valorActual.length > 13){
                    this.valorActual = this.valorActual.slice(0,13);
                } 
            
                this.displayValorActual.textContent = this.valorActual;
                this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
            }

            calcular(){
                const valorAnterior = parseFloat(this.valorAnterior);
                const valorActual = parseFloat(this.valorActual);

                if(isNaN(valorActual) || isNaN(valorAnterior)) return
                this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual).toString();

                let resultado;

                switch (this.tipoOperacion) {
                  case 'sumar':
                    resultado = valorAnterior + valorActual;
                    break;
                  case 'restar':
                    resultado = valorAnterior - valorActual;
                    break;
                  case 'multiplicar':
                    resultado = valorAnterior * valorActual;
                    break;
                  case 'dividir':
                    if (valorActual === 0) {
                      this.mostrarError("Operacion Erronea");
                      return;
                    }
                    resultado = valorAnterior / valorActual;
                    break;
                  default:
                    this.mostrarError("Operación no válida");
                    return;
                }
            
                if (resultado.toString().length > 13) {
                  const digitosExtras = resultado.toString().length - 13;
                  resultado = resultado.toString().slice(0, 13) + `+${digitosExtras}`;
                }
            
                this.valorActual = resultado.toString();
              }
            
              mostrarError(mensaje) {
                this.valorActual = mensaje;
              }
            }
    



const display = new Display(displayValorAnterior, displayValorActual);

botonesNumeros.forEach(boton => {
    boton.addEventListener('click', () => {
        display.agregarNumero(boton.innerHTML);
    })
});

botonesOperadores.forEach(boton => {
    boton.addEventListener('click', () => {
        display.computar(boton.value);
    })
});
