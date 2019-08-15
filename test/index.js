const SellerRepository = require('../app/repositories/SellerRepository')
const Seller = require('../app/models/Seller')

const sellerRepository = new SellerRepository()

async function main () {
  try {
    await sellerRepository.connect()

    let seller = new Seller(
      0,
      'gmochi56@outlook.com',
      'Ricardo',
      'Amorim',
      new Date(1972, 0, 0, 0, 0, 0, 0),
      '+551140028922',
      '05145-200',
      'Brasil',
      'SP',
      'São Paulo',
      'Av. Brasil',
      1234
    )

    const getAllResults = await sellerRepository.getAll()

    console.log(getAllResults)

    const getResult = await sellerRepository.get(1)

    console.log(getResult)

    const createResult = await sellerRepository.create(seller)

    console.log(createResult)

    seller = await sellerRepository.get(createResult)

    seller.email = 'ricardo.amorimg@globo.com.br'

    const updateResult = await sellerRepository.update(seller.id, seller)

    console.log(updateResult)

    // const removeResult = await sellerRepository.delete(seller.id)

    // console.log(removeResult)

    await sellerRepository.close()
  } catch (err) {
    console.error(err)
  }
}

main()
