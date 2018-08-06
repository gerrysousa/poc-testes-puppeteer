import faker from "faker";
import puppeteer from "puppeteer";
import Fazenda_cadastro from '../Pages/fazenda_cadastro_page.js';
import Fazenda_lista from '../Pages/fazenda_lista_page.js';
import Home_Page from '../Pages/home_page.js';
import Base_Teste from "./Base_testes.js";

Home_Page.APP;
let page;
let browser;
const width = 1360;
const height = 768;

beforeAll(async() => {
    browser = await puppeteer.launch({
        headless: false,
        //slowMo: 80,
        args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
    await page.goto('http://localhost:4200/');

});
afterAll(() => {
    browser.close();
});

/*
test('cadastrar-com-sucesso', async() => {
    await page.click(Home_Page.btn_Fazenda);
    await page.waitFor(Fazenda_lista.btn_add);
    await page.click(Fazenda_lista.btn_add);

    await page.type(Fazenda_cadastro.nome, 'Fazenda nome Cadastro');
    await page.click(Fazenda_cadastro.nomeReduzido);
    await page.type(Fazenda_cadastro.nomeReduzido, 'Faz reduzido');
    await page.type(Fazenda_cadastro.descricao, 'Descrição da Fazenda');
    await page.type(Fazenda_cadastro.cidade, 'Cidade');
    await page.type(Fazenda_cadastro.estado, 'UF');
    await page.click(Fazenda_cadastro.btn_salvar);

    //verificar ser foi salvo
    await page.type(Fazenda_lista.txt_pesquisa, 'Fazenda nome Cadastro');
    await page.waitFor(Fazenda_lista.campo_nome);
    const achou = await page.$eval(Fazenda_lista.campo_nome,
        (element) => {
            return element.innerHTML
        })
    expect(achou).toBe(" Fazenda nome Cadastro ");

    await page.click(Fazenda_lista.btn_excluir);
    await page.click(Fazenda_lista.btn_Alert_confirma)

}), 20000;*/


test('editar-com-sucesso', async() => {
    await page.click(Home_Page.btn_Fazenda);
    await page.waitFor(Fazenda_lista.btn_add);
    await page.click(Fazenda_lista.btn_add);

    await page.type(Fazenda_cadastro.nome, 'Fazenda Não Editada');
    await page.click(Fazenda_cadastro.nomeReduzido);
    await page.type(Fazenda_cadastro.nomeReduzido, 'Faz Não editada');
    await page.type(Fazenda_cadastro.descricao, 'Descrição Não Editada');
    await page.type(Fazenda_cadastro.cidade, 'Cidade Não Editada');
    await page.type(Fazenda_cadastro.estado, 'AA');
    await page.click(Fazenda_cadastro.btn_salvar);

    //verificar ser foi salvo
    await page.type(Fazenda_lista.txt_pesquisa, 'Fazenda Não Editada');
    await page.waitFor(Fazenda_lista.campo_nome);
    const achou = await page.$eval(Fazenda_lista.campo_nome,
        (element) => {
            return element.innerHTML
        })
    expect(achou).toBe(" Fazenda Não Editada ");

    //sequencia para editar fazenda
    //limpar campos
    await page.waitFor(Fazenda_lista.btn_editar);
    await page.click(Fazenda_lista.btn_editar);
    await page.waitFor(Fazenda_cadastro.nome);
    await Base_Teste.limparCampo(Fazenda_cadastro.nome, page);
    await Base_Teste.limparCampo(Fazenda_cadastro.nomeReduzido, page);
    await Base_Teste.limparCampo(Fazenda_cadastro.descricao, page);
    await Base_Teste.limparCampo(Fazenda_cadastro.cidade, page);
    await Base_Teste.limparCampo(Fazenda_cadastro.estado, page);

    //alterando nomes
    await page.type(Fazenda_cadastro.nome, 'Fazenda Editada');
    await page.click(Fazenda_cadastro.nomeReduzido);
    await page.type(Fazenda_cadastro.nomeReduzido, 'Faz editada');
    await page.type(Fazenda_cadastro.descricao, 'Descrição Editada');
    await page.type(Fazenda_cadastro.cidade, 'Cidade Editada');
    await page.type(Fazenda_cadastro.estado, 'BB');
    await page.click(Fazenda_cadastro.btn_salvar);

    /*await page.waitFor(Home_Page.btn_home);
    await page.click(Home_Page.btn_home);
    await page.click(Home_Page.btn_Fazenda);*/
    await page.waitFor(Home_Page.btn_home);
    await page.click(Home_Page.btn_home);
    await page.waitFor(Home_Page.btn_home);
    await page.click(Home_Page.btn_home);

    await page.click(Home_Page.btn_Fazenda);
    //await Base_Teste.limparCampo(Home_Page.txt_pesquisa, page);
    await page.waitFor(Fazenda_lista.txt_pesquisa);
    await page.type(Fazenda_lista.txt_pesquisa, 'Fazenda Editada');
    await page.waitFor(Fazenda_lista.campo_nome);
    const achou2 = await page.$eval(Fazenda_lista.campo_nome,
        (element) => {
            return element.innerHTML
        })
    expect(achou2).toBe(" Fazenda Editada ");

}), 20000;

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time)
    });
}