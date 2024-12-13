import fs from 'fs'

const files = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth']

files.forEach((file) => {
  const data = JSON.parse(fs.readFileSync(`./public/${file}.json`, 'utf-8'))

  data.forEach((element) => {
    const galleryLength = Math.floor(Math.random() * 10)

    element.image = `https://picsum.photos/1920/1080?random=`

    element.gallery = []

    for (let i = 0; i < galleryLength; i++) {
      element.gallery.push(element.image)
    }

    element.info = []

    element.info.push({ label: 'Weight', value: Math.floor(Math.random() * 1000) + 'kg' })
    element.info.push({
      label: 'Dimensions',
      value:
        Math.floor(Math.random() * 100) +
        'x' +
        Math.floor(Math.random() * 100) +
        'x' +
        Math.floor(Math.random() * 100) +
        'cm',
    })
    element.info.push({ label: 'Power', value: Math.floor(Math.random() * 100) + 'hp' })
    element.info.push({ label: 'Torque', value: Math.floor(Math.random() * 100) + 'Nm' })
    element.info.push({ label: 'Top speed', value: Math.floor(Math.random() * 100) + 'km/h' })
    element.info.push({ label: 'Tank capacity', value: Math.floor(Math.random() * 100) + 'l' })

    element.brand = file
  })

  fs.writeFileSync(`./public/${file}.json`, JSON.stringify(data))
})
