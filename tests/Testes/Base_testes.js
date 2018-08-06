const Base_Teste = {


    limparCampo: async function limparCampo(campo, page) {

        await page.click(campo);
        await page.keyboard.press('End');

        const nomeCampo = await page.$eval(campo, el => el.value);
        for (let i = 0; i < nomeCampo.length; i++) {
            await page.keyboard.press('Backspace');
        }
    }
}


export default Base_Teste;