# Pubblicare Occhio Aperto su itch.io

Tutto quello che serve per la pagina itch è in questa cartella o nella release automatica di GitHub.

## 1. File da caricare

Scaricali dalla release (si aggiornano da soli a ogni modifica del gioco):
https://github.com/AgonyLecter/occhioaperto/releases/tag/windows

| File | Su itch | Impostazione |
|---|---|---|
| `OcchioAperto-Web.zip` | gioco nel browser | spunta **"This file will be played in the browser"** |
| `OcchioAperto-Windows.zip` | download Windows | spunta **Windows** |
| APK di PWABuilder (`app-release-signed.apk`) | download Android | spunta **Android** |

L'APK lo generi tu su PWABuilder (con la tua chiave): non è nella release.

## 2. Impostazioni della pagina

- **Kind of project:** HTML
- **Classification:** Games — **Genre:** Interactive Fiction
- **Title:** Occhio Aperto · **Short description:** "Un horror psicologico in cinque capitoli. / A psychological horror in five chapters."
- **Cover image:** `cover-it.png` oppure `cover-en.png` (630×500)
- **Screenshots:** i file in `../screenshots/`
- **Description:** il testo di `descrizione.md` (italiano + inglese)
- **Tags e metadati:** vedi `tag.txt`

**Embed options** (per la versione nel browser):
- Viewport: **1280 × 720**
- ✅ **Mobile friendly**, orientamento **Landscape**
- ✅ **Fullscreen button**
- ✅ **Click to launch in fullscreen** (consigliato su telefono)

## 3. Donazioni e sblocco dei capitoli 4–5

Nel gioco, **Menu → Capitoli** mostra i capitoli 4 e 5 come "per chi sostiene il gioco", con un pulsante verso itch e un campo per il **codice sostenitore**. Il codice giusto sblocca i capitoli su quel dispositivo, in tutte le versioni (browser, Windows, Android).

Il codice **non è scritto da nessuna parte nel repository** (c'è solo la sua impronta cifrata): te l'ho dato in chat. Tienilo privato.

Come farlo arrivare a chi dona (da verificare nel pannello di itch, le opzioni cambiano nel tempo):

- **Modo A, automatico:** imposta la pagina come **Paid** con prezzo minimo basso (es. 2 €) e "Let people pay more". Segna i tre file di gioco come **Demo** (scaricabili gratis) e carica un piccolo file `Codice-sostenitore.txt` con il codice, **non** segnato come demo: lo scarica solo chi paga. Controlla che la versione nel browser resti giocabile gratis; se itch la blocca dietro il pagamento, usa il modo B.
- **Modo B, semplice:** pagina **Donate** (gioco gratis, donazione facoltativa). Chi dona compare nell'elenco degli acquisti di itch: gli mandi tu il codice per email. Più lavoro manuale, ma funziona sempre.

Se un giorno il codice gira troppo, me lo dici e ne genero uno nuovo (quello vecchio smette di funzionare solo se lo rimuoviamo).

## 4. Link utili

- Gioco online: https://occhioaperto.vercel.app/
- Download Windows: https://occhioaperto.vercel.app/windows/
- Indirizzo itch previsto dal gioco: `https://agonylecter.itch.io/occhio-aperto` (se la tua pagina avrà un indirizzo diverso, va cambiato `ITCH_URL` in `index.html`).
