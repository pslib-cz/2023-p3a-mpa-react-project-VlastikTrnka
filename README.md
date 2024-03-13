# Název mého projektu, programu, hry...

## Téma

### Task Manager
#### Zobrazení Úkolů
**1. Seznam úkolů:** Na hlavní obrazovce by byl zobrazen seznam úkolů, které uživatel vytvořil. Každý úkol by měl základní informace jako název, popis, priorita, termín atd.

**2. Kategorie úkolů:** Uživatel by mohl kategorizovat své úkoly do různých kategorií, což by mu umožnilo lépe je organizovat.

**3. Filtrování a Řazení:** Uživatel by měl možnost filtrovat a řadit své úkoly podle různých kritérií, jako je priorita, termín splnění, stav atd.

#### Drag and Drop Funkcionalita
**1. Přesun úkolů:** Uživatel by měl možnost jednoduše přesouvat úkoly táhnutím a přetažením mezi různými kategoriemi nebo upravovat jejich pořadí.

**2. Uspořádání Úkolů:** Po přesunutí úkolu by se automaticky aktualizovala jejich pořadí a zobrazení v rámci kategorie.

**3. Visuální Indikace:** Během přetahování úkolu by měl uživatel vidět vizuální indikace, kam se úkol bude umístit po puštění, aby bylo jasné, kam bude umístěn.

#### Další Funkcionality
**1. Detaily Úkolů:** Po kliknutí na konkrétní úkol by uživatel měl možnost zobrazit podrobné informace o něm a případně provádět úpravy.

**2. Vytváření a Odstraňování Úkolů:** Uživatel by měl možnost přidávat nové úkoly a odstraňovat existující.

**3. Notifikace a Upozornění:** Aplikace by mohla poskytovat možnost nastavení upozornění pro blížící se termíny splnění úkolů.

**4. Ukládání Dat:** Data o úkolech by měla být uložena v localStorage, aby se uživatelská data uchovala i po opuštění a opětovném otevření aplikace.

## Odkazy pro vývoj

Zde budou živé linky na:
- figma návrh stránek aplikace
- odkaz na gh-pages projektu
- odkaz do repozitáře projektu, pokud pracuji v teamu a zde vývoj neprobíhá

### Z čeho čerpat

- interaktivní hra (předělávka "deskovky")
- mohlo by být použitelné jako solitaire
- nebo "AI" protihráč
- inspirovat se můžete na [zatrolených hrách](https://www.zatrolene-hry.cz/katalog-her/?fType=cat&keyword=&theme=-1&category=-1&minlength=-1&maxlength=-1&localization=6%2C+7%2C+8&min_players=1&max_players=1&age=-1)...
- karetní hry méně typické - např. [Kabo](https://www.zatrolene-hry.cz/spolecenska-hra/kabo-8341/)
- učitelem oblíbená [Cartagena](https://www.zatrolene-hry.cz/spolecenska-hra/cartagena-422/) stále čeká na remake

### Techniky

- využití localStorage / sessionStorage
- čtení dat z externího RestAPI (fetch)
- operace DnD
- využití react-routeru
- funkčnost na mobilu (výjimka je předělávka komplexních deskových her)

### Co není obsahem 

- databáze
- bez vlastních backend service
- trapné věci: *klasické karetní hry*, *člověče nezlob se*, ...
