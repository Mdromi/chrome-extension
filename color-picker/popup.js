const btn = document.querySelector('.changeColorBtn');
const colorGrid = document.querySelector('.colorGrid');
const colorValue = document.querySelector('.colorValue');

function extractNumbers(str) {
    let numbers = str.match(/\d+/g);
    return numbers;
 }

 async function rgbaToHex(rgbaColor) {
    const hexColor = await extractNumbers(rgbaColor)
    let [r, g, b, a] = [...hexColor]
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    a = Math.round(a * 255);
 
    let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    if (a !== 255) {
        hex += Math.round(a).toString(16);
    }
 
    return hex;
 }
 

btn.addEventListener('click', async () => {
    chrome.storage.sync.get('color', ({ color }) => {
        console.log('color: ', color);
    });
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: pickColor,
        },
        async (injectionResults) => {
            const [data] = injectionResults;
            if (data.result) {
                const color = data.result.sRGBHex;
                const hexColor = await rgbaToHex(color)
                console.log(colorGrid);
                colorGrid.style.backgroundColor = hexColor;
                colorValue.innerText = hexColor;
                try {
                    await navigator.clipboard.writeText(hexColor);
                } catch (err) {
                    console.error(err);
                }
            }
        }
    );
});

async function pickColor() {
    try {
        // Picker
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
    } catch (err) {
        console.error(err);
    }
}
