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
