export interface Client {
  _id?: string
  email: string
  nom: string
  motDePasse?: string
  telephone: string
  prenom: string
}
export interface Login {
  client: Client,
  message: string,
  token: string
}
export interface CategorieDeVehicule {
  _id?: string,
  nom: string,
  description: string
}
export interface Vehicule {
  immatriculation: string,
  _id: string
  categorie: CategorieDeVehicule
}

export interface ServiceDetail {
  _id: string
  categorieDeVehicule: CategorieDeVehicule
  service: {_id: string, nomService: string}
}

export interface DetailService{
  _id: string
  tempsEstime: number
  prix: number
  marge: number
  serviceDetails:{_id: string, service: string}
  description: string
}

export interface DeviInsert {
  taches: DetailService[]
  dateDemande :{dateHeureDebut: Date, dateHeureFin: Date}[]
  vehicule: string | null
}
