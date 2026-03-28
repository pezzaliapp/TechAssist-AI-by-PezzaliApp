# TechAssist Demo by PezzaliApp

Demo PWA locale per assistenza tecnica su equilibratrici Cormach.

Questa versione:
- non usa API esterne
- non usa Google AI Studio
- non usa OpenAI
- non richiede backend
- gira direttamente nel browser

---

## Struttura repository

```text
techassist-demo/
├── index.html
├── offline.html
├── manifest.json
├── sw.js
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

---

## Come funziona

La demo usa regole locali JavaScript per:
- riconoscere i modelli supportati
- bloccare richieste commerciali
- mostrare procedure di calibrazione
- guidare la diagnosi rapida
- mantenere in memoria modello e sintomi nella sessione

Non genera testo con un modello AI remoto.

---

## Modelli gestiti

- MEC 5
- MEC 10
- MEC 20
- MEC 20-P
- MEC 810
- MEC 810 VDBL ESD
- MEC 820
- MEC 820 VDL
- MEC 820 VDLL
- Touch MEC 1000
- Touch MEC 1000-P

---

## Pubblicazione su GitHub Pages

1. carica i file nella repo
2. vai in **Settings → Pages**
3. scegli **Deploy from branch**
4. seleziona `main` e cartella `/root`
5. salva

---

## Personalizzazioni future

Puoi aggiornare `index.html` per:
- aggiungere altri modelli
- estendere le procedure
- cambiare testi e suggerimenti iniziali
- inserire nuove regole tecniche

Non serve alcuna chiave API.
