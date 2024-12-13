export interface Bike {
  id: string
  bikeName: string
  bikeSlogan: string
  bikeDesc: string
  image: string
  price: number
  oldPrice: number
  category: string
  brand: string
  mainYear: number
  info: {
    label: string
    value: string
  }[]
  gallery: string[]
}

export interface NewsArticle {
  id: string
  author: string
  headline: string
  content: string
  created_at: string
}
