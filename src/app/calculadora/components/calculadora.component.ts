import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from '../services';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  private numero1: string;
  private numero2: string;
  private resultado: number;
  private operacao: string;

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit(): void {
    this.limpar();
  }

  /**
   * Inicializa todos os operadores para o valor padrão.
   * @returns void
   */
  limpar(): void {
    this.numero1 = '0';
    this.numero2 = null;
    this.resultado = null;
    this.operacao = null;
  }

  /**
   * Adiciona o numero selecionado para o calculo posteriormente.
   * @param numero string 
   * @returns void
   */
  adicionarNumero(numero: string): void {
    if (this.operacao == null){
      this.numero1 = this.concatenarNumero(this.numero1, numero);
    } else {
      this.numero2 = this.concatenarNumero(this.numero2, numero);

    }
  }

  /**
   * Retorna o valor concatenado. Trata o separador decimal.
   * @param numAtual string
   * @param numConcat string
   * @returns string
   */
  concatenarNumero(numAtual: string, numConcat: string): string {
    if (numAtual === '0' || numAtual === null) numAtual = '';
    if (numConcat === '.' && numAtual === '') return '0.';
    if (numConcat === '.' && numAtual.indexOf('.') > -1) return numAtual;

    return numAtual + numConcat;
  }
  /**
   * Executa a lógica quando um operador for selecionado.
   * Caso já possua uma operção selecionada, executa a
   * operação anterior, e define a nova a operação.
   * @param operacao string
   * @returns void
   */
  definirOperacao(operacao: string): void {
    if (this.operacao === null){
      this.operacao = operacao;
      return;
    }

    if (this.numero2 !== null){
      this.resultado = this.calculadoraService.calcular(
        parseFloat(this.numero1),
        parseFloat(this.numero2),
        this.operacao);
      this.operacao = operacao;
      this.numero1 = this.resultado.toString();
      this.numero2 = null;
      this.resultado = null;
    }
  }

  /**
   * Efetua o calculo de uma operação.
   * @returns void
   */
  calcular(): void {
    if (this.numero2 === null) return;

    this.resultado = this.calculadoraService.calcular(
      parseFloat(this.numero1),
      parseFloat(this.numero2),
      this.operacao);
  }

  /**
   * Retorna o valor a ser exibido na tela da calculadora
   * @returns string
   */
  get display(): string {
    if (this.resultado !== null) return this.resultado.toString();
    if (this.numero2 !== null) return this.numero2;
    
    return this.numero1;
  }

}
