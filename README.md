# TechAssist AI by PezzaliApp

Assistente tecnico AI per officine e gommisti.  
Sviluppato da **PezzaliApp** – pezzaliapp.com

---

## Struttura repository (pubblica su GitHub)

```
techassist-ai/
├── index.html        ← PWA principale (zero riferimenti interni)
├── offline.html      ← Pagina offline
├── manifest.json     ← Config PWA
├── sw.js             ← Service Worker
└── icons/
    ├── icon-192.png  ← Da creare (192×192 px)
    └── icon-512.png  ← Da creare (512×512 px)
```

**`cloudflare-worker.js` NON va nella repo GitHub.**  
Contiene la logica tecnica e i contatti interni. Va deployato solo su Cloudflare.

---

## STEP 1 – Deploy Cloudflare Worker

1. Vai su https://workers.cloudflare.com → Login (account free)
2. **Create Worker** → nome es. `techassist-proxy`
3. Cancella codice di esempio, incolla tutto `cloudflare-worker.js`
4. **Save and Deploy**
5. **Settings → Variables → Add variable**:
   - Nome: `GEMINI_API_KEY`
   - Valore: la tua API key Google Gemini
   - ✅ Clicca **Encrypt**
6. Copia l'URL del Worker: `https://techassist-proxy.tuonome.workers.dev`

---

## STEP 2 – Configura index.html

Apri `index.html`, riga con `WORKER_URL`, sostituisci:

```js
const WORKER_URL = "https://techassist-proxy.IL-TUO-NOME.workers.dev";
```

---

## STEP 3 – Crea le icone PWA

Due PNG nella cartella `icons/`:
- `icon-192.png` → 192×192 px
- `icon-512.png` → 512×512 px

Usa https://realfavicongenerator.net o crea un'icona con il logo PezzaliApp.

---

## STEP 4 – Deploy GitHub Pages

```bash
git init
git add .
git commit -m "TechAssist AI v1.0 by PezzaliApp"
git remote add origin https://github.com/pezzaliapp/techassist-ai.git
git push -u origin main
```

Attiva GitHub Pages:  
**repo → Settings → Pages → Source: main / root**

URL finale: `https://pezzaliapp.github.io/techassist-ai/`

---

## STEP 5 – Dominio custom (opzionale)

Per usare `https://techassist.pezzaliapp.com`:

1. GitHub Pages → Custom domain → `techassist.pezzaliapp.com`
2. DNS: aggiungi CNAME `techassist` → `pezzaliapp.github.io`
3. Nel Worker, aggiungi `https://techassist.pezzaliapp.com` a `ALLOWED_ORIGINS`

---

## Aggiungere nuovi prodotti al prompt

Il system prompt è nel `cloudflare-worker.js`, variabile `SYSTEM_PROMPT`.  
Le sezioni marcate `[da integrare nel prossimo step]` sono già pronte per:
- Smontagomme
- Ponti sollevatori Cascos C-series
- Calibrazione Touch MEC 1000

Incolla le procedure nelle sezioni corrispondenti e ri-deploya il Worker.  
**Il frontend GitHub non va mai modificato per aggiornare le procedure.**

---

## Limiti piani gratuiti

| Servizio | Limite free |
|---|---|
| Cloudflare Workers | 100.000 req/giorno |
| Gemini 2.0 Flash | 1.500 req/giorno, 1M token/min |
| GitHub Pages | Illimitato (repo pubblica) |

Tutto gratuito e abbondante per un tool di assistenza tecnica.
