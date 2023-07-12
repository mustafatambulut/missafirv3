## MİSSAFİR V3

### Installing

1. Clone this repository:

```bash
 git clone git@bitbucket.org:missafir/missafirv3-strapi.git
 cd missafirv3-strapi
 cp .env.example .env
```

2. Create empty database. DB name: `missafir_db` run seed command for dummy data generation

> ⚠️ Important! This command will remove all data 

```bash
yarn seed
```

3. Install dependencies:

```bash
 yarn
```

## 🚀 Running the app locally

4. To run the app locally, you can use:

```bash
  yarn develop
```

You should now be able to see the admin panel running at `http://localhost:1337/admin` in your web browser.

## All Endpoints

```bash            
  yarn strapi routes:list        
```

## Usage CLI

```bash             
  yarn strapi        
```

## Building

To build the Missafir V3 locally, you can use:

```bash
  yarn build
```

### Versions

- Strapi:4.10.5
