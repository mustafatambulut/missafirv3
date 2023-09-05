import { createSlice } from "@reduxjs/toolkit";

import {
  OWNER_TYPE_1,
  OWNER_TYPE_2,
  STEP_1
} from "@/redux/features/ownerSlice/enum";

// todo: api entegrasyonu sonrası güncellenecek
const initialState = {
  currentStep: STEP_1,
  selectedOwnerType: OWNER_TYPE_1,
  ownerTypes: [
    { type: OWNER_TYPE_1, label: "I want to rent my home" },
    {
      type: OWNER_TYPE_2,
      label: "We are a corporation"
    }
  ],
  countries: [
    {
      icon: "https://www.missafir.com/wp-content/uploads/2023/06/flag-turkey.svg",
      label: "Turkey",
      description: "View 3,557 property",
      code: 1
    },
    {
      icon: "https://www.missafir.com/wp-content/uploads/2023/06/flag-croatia.svg",
      label: "Croatia",
      description: "View 3,557 property",
      code: 2
    },
    {
      icon: "https://www.missafir.com/wp-content/uploads/2023/06/flag-montenegro.svg",
      label: "Montenegro",
      description: "View 3,557 property",
      code: 3
    },
    {
      icon: "https://www.missafir.com/wp-content/uploads/2023/06/flag-turkey.svg",
      label: "Northern Cyprus",
      description: "View 3,557 property",
      code: 4
    }
  ],
  listings: [
    {
      uuid: "c9039522-db4c-47ff-8959-8f15d20d1c00",
      occupancy: 4,
      min_nights: 3,
      pictures: [
        {
          id: 29321,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/820d5defd35525b23f72fe09f2060858b2b6fd72363033b6e1bbeae5082381492cc22b0e371eaa2e1565376faad22c724839647c8410a1c47d3649f09740cd3e.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/820d5defd35525b23f72fe09f2060858b2b6fd72363033b6e1bbeae5082381492cc22b0e371eaa2e1565376faad22c724839647c8410a1c47d3649f09740cd3e.jpg",
          caption:
            "The colorful atmosphere here will help you unwind and enjoy your time."
        },
        {
          id: 29317,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/79990d31e4f89e47f0583cbbde0b6be55fbb8a43236290678e3b074395529380c682e230a5e44e0d4866ed9d039b3bfba4a1799f71b76b223c6f23b13f5110ae.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/79990d31e4f89e47f0583cbbde0b6be55fbb8a43236290678e3b074395529380c682e230a5e44e0d4866ed9d039b3bfba4a1799f71b76b223c6f23b13f5110ae.jpg",
          caption:
            "Anything you need for a pleasant home experience is right here."
        },
        {
          id: 29314,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/981657d10969d2fa62d8ff8d88b585b12b51f917b459418b8beb428397995d2d9a3a5bef3a1df745bdb703b6018ab94bfccb9753969981a4aa0a63fc614b6645.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/981657d10969d2fa62d8ff8d88b585b12b51f917b459418b8beb428397995d2d9a3a5bef3a1df745bdb703b6018ab94bfccb9753969981a4aa0a63fc614b6645.jpg",
          caption: "Welcome to Adore!"
        },
        {
          id: 29313,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/0ed437e9b3043e870c7894a4b875d21745e7284b89b936d2eb7c70127b24a5bb19f69228655cf413518bb0bc209c6b7d8db2185ef16bfc330d784d17d769e9d7.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/0ed437e9b3043e870c7894a4b875d21745e7284b89b936d2eb7c70127b24a5bb19f69228655cf413518bb0bc209c6b7d8db2185ef16bfc330d784d17d769e9d7.jpg",
          caption:
            "Here you can walk out to the balcony to soak up refreshing air and enjoy peace."
        },
        {
          id: 29312,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/3e7741da6ad3f74d524a2a166e8526ecd503ed5718bf630a772a6783f35b4121908a9c65b5e95f819a1a7b688cad523ca623413017750ff5a2b5c0a531a69452.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/3e7741da6ad3f74d524a2a166e8526ecd503ed5718bf630a772a6783f35b4121908a9c65b5e95f819a1a7b688cad523ca623413017750ff5a2b5c0a531a69452.jpg",
          caption:
            "Every single detail is meticulously selected for your contentment."
        },
        {
          id: 29315,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/6eafc443b4478712b8dafb83973121b5973744fb171b67ccb05af8abc076be3cf0866b086151f0a8042d0b5d67d025aa76ab9290e96eb89bf79ccbe6b4153f27.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/6eafc443b4478712b8dafb83973121b5973744fb171b67ccb05af8abc076be3cf0866b086151f0a8042d0b5d67d025aa76ab9290e96eb89bf79ccbe6b4153f27.jpg",
          caption:
            "The master bedroom includes an ensuite bathroom for extra comfort and privacy."
        },
        {
          id: 29316,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/a42d664e7be758d0220996a5b2abe10d980cf34aac21e51c021a637d8c4efb6364fdcde2d49a994b3c351e2a029c0711ec625d459f7d5ba0899406a6d1d09105.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/a42d664e7be758d0220996a5b2abe10d980cf34aac21e51c021a637d8c4efb6364fdcde2d49a994b3c351e2a029c0711ec625d459f7d5ba0899406a6d1d09105.jpg",
          caption:
            "You will find the comfort and convenience you seek in our apartment."
        },
        {
          id: 29318,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/21c8aacbdb8362fe279703d9bb8fbec26c5272233e0803926dc77faf0e2c8dab5ac42a11e3de9f37319cc5308a629a1c0e18c29b6e922691d71948d69e93db25.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/21c8aacbdb8362fe279703d9bb8fbec26c5272233e0803926dc77faf0e2c8dab5ac42a11e3de9f37319cc5308a629a1c0e18c29b6e922691d71948d69e93db25.jpg",
          caption: "Our modern and stylish home is ready for you."
        },
        {
          id: 29319,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/b7720fa3a3a39353431f92c3546cc0656ff562093c14f2bcc52f26d1b10cc69302b3da33688829c216c1f3a43fd8d9ee8c8b1a2734101bfe3a6eba4a979abe37.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/b7720fa3a3a39353431f92c3546cc0656ff562093c14f2bcc52f26d1b10cc69302b3da33688829c216c1f3a43fd8d9ee8c8b1a2734101bfe3a6eba4a979abe37.jpg",
          caption:
            "The kitchen is fully equipped with state-of-the-art white goods and appliances."
        },
        {
          id: 29311,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/0cccd179a8512f1d9fd4e92f811706d28cc899743a55c6ca000e02f2241e5585bd98934725a6fbe9a1ebc464698862ab4bbbe4335999568de8284b417c83b47a.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/0cccd179a8512f1d9fd4e92f811706d28cc899743a55c6ca000e02f2241e5585bd98934725a6fbe9a1ebc464698862ab4bbbe4335999568de8284b417c83b47a.jpg",
          caption:
            "The eclectic living area is where you will relax and feel at home after a long day of discovery."
        },
        {
          id: 29320,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/09b5b0910f87b40ccc0bdbb5829b2329eb1b9959056c2e053915abb7d95a14302e1f15800ea4a58319c153400f293a296c575959e561f7970e03a085c02fe201.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/09b5b0910f87b40ccc0bdbb5829b2329eb1b9959056c2e053915abb7d95a14302e1f15800ea4a58319c153400f293a296c575959e561f7970e03a085c02fe201.jpg",
          caption:
            "We have curated an aesthetically impressive environment to offer you a visual feast."
        },
        {
          id: 29322,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/bfed02d653035aeab1ac4c0f9d2f1e964445ced19744c7eb7288fe119cf66dca3dab769a86fed4bba401c37398e40456c00e9cc87c194e245cfca46781429f8b.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/bfed02d653035aeab1ac4c0f9d2f1e964445ced19744c7eb7288fe119cf66dca3dab769a86fed4bba401c37398e40456c00e9cc87c194e245cfca46781429f8b.jpg",
          caption:
            "Everything is well-thought-out for you to have a fulfilling experience."
        },
        {
          id: 29323,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/f7ebf0e7c39a75337b9d121a010a2e22818fa2330027b7d19c0c3f5663faeab39ff81a59eff79ec7f46851273779e1f9444e7663a07df00b9a0129c74a22b434.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/f7ebf0e7c39a75337b9d121a010a2e22818fa2330027b7d19c0c3f5663faeab39ff81a59eff79ec7f46851273779e1f9444e7663a07df00b9a0129c74a22b434.jpg",
          caption:
            "Each corner of our home is up to our high standards of hygiene."
        },
        {
          id: 29324,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/d076542e77211e2e13a7d093f5f5565f569ad81be4e36760718a6769693a3f0d4ca428de655c6e1aabe9f05c0fb08bbf1dedae8a32e717a533edf35008e99a4b.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/d076542e77211e2e13a7d093f5f5565f569ad81be4e36760718a6769693a3f0d4ca428de655c6e1aabe9f05c0fb08bbf1dedae8a32e717a533edf35008e99a4b.jpg",
          caption:
            "The open floor plan helps create a sense of spaciousness here."
        },
        {
          id: 29325,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/2bf4c27a3f748290dc148c925a6ea9b7fa3fad20fb146cd1eef9afa0c25f18c7db72cf1bc47eb31cb35dd61b89cc4a16ee301856e7c5e074fd57f23d6a7fa315.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/2bf4c27a3f748290dc148c925a6ea9b7fa3fad20fb146cd1eef9afa0c25f18c7db72cf1bc47eb31cb35dd61b89cc4a16ee301856e7c5e074fd57f23d6a7fa315.jpg",
          caption: "You can discover your inner chef quite effortlessly here."
        },
        {
          id: 29326,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/f02acae969e78f9e5256259a292119cfb2230a405730b81c8c0a0419f810b862002205c5cc11d4bdefea4aca45043a422e0b630fde9ecaf87bf6f6604845ac9f.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/f02acae969e78f9e5256259a292119cfb2230a405730b81c8c0a0419f810b862002205c5cc11d4bdefea4aca45043a422e0b630fde9ecaf87bf6f6604845ac9f.jpg",
          caption:
            "Just follow the white rabbit and it will take you to your home away from home."
        },
        {
          id: 29327,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/4ad38bcbb0b064e5e68e983d3d192dcd9f62f59090d6938a99c5ccae8e622b2758c9910896ab689a0e6393271d50d4614f146959d34987f88c7575b6d7030d62.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/4ad38bcbb0b064e5e68e983d3d192dcd9f62f59090d6938a99c5ccae8e622b2758c9910896ab689a0e6393271d50d4614f146959d34987f88c7575b6d7030d62.jpg",
          caption:
            "We have prepared a gift for you to extend our hospitality and welcome you into a dreamy stay."
        },
        {
          id: 29328,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/fac96fce44ca7395f486fc00513b338838aff9488313cb2b955f55f3fc1bfc3fed6e06833cb5f01fa0876ce89303ae166f23d8ccb75ad925c2ddb6f897f04974.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/fac96fce44ca7395f486fc00513b338838aff9488313cb2b955f55f3fc1bfc3fed6e06833cb5f01fa0876ce89303ae166f23d8ccb75ad925c2ddb6f897f04974.jpg",
          caption:
            "There are three comfy and stylish bedrooms in our apartment."
        },
        {
          id: 29329,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/9a203272905af969a09e7bf551a6f869abf74de1f0d2c35461b4849e8d5b12cd8a57a4737f7ea139fc6d9eec5802d203b6be2b619fad2ac01810ad33190240e1.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/9a203272905af969a09e7bf551a6f869abf74de1f0d2c35461b4849e8d5b12cd8a57a4737f7ea139fc6d9eec5802d203b6be2b619fad2ac01810ad33190240e1.jpg",
          caption: "You can wake up well-rested to the beautiful day ahead."
        },
        {
          id: 29330,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/f227427dbd79c43c10c383219b3940b77a2b6db300779c4b44b63eec8bfbf2955acacc7e8b3074d453a614899c2e756c5309c977addc003cdd519c3ed6b8b9e1.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/f227427dbd79c43c10c383219b3940b77a2b6db300779c4b44b63eec8bfbf2955acacc7e8b3074d453a614899c2e756c5309c977addc003cdd519c3ed6b8b9e1.jpg",
          caption:
            "Our bedrooms are not just offering comfort but an eye-pleasing ambiance as well."
        },
        {
          id: 29331,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/ae1d2b9dd8b35ff36c8c7d4e8bf0176aa4f4f157fb57d757e7b1e40bbba2f0115913e67a227fea80d0004afb6c774e2873baa6088c1419f01d9727f29032872a.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/ae1d2b9dd8b35ff36c8c7d4e8bf0176aa4f4f157fb57d757e7b1e40bbba2f0115913e67a227fea80d0004afb6c774e2873baa6088c1419f01d9727f29032872a.jpg",
          caption: "There is plenty of storage space for your belongings."
        },
        {
          id: 29332,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/b341008bbe6277f97020e93b4701bb1b1ecf9210dddf3d90bca3b607182ef9f31b9dcbdae0ec8755103da2e1a802421b53c589dac8816f8c0ac334f73a03e82d.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/b341008bbe6277f97020e93b4701bb1b1ecf9210dddf3d90bca3b607182ef9f31b9dcbdae0ec8755103da2e1a802421b53c589dac8816f8c0ac334f73a03e82d.jpg",
          caption: "It's modern, sleek and neat."
        },
        {
          id: 29333,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/aabaf4f639968a50ade91a3eb3381a6ebfd7fbde9afe9337836f9889180c15d1de1eaa821ed2657793ee817b0402325ccd672cc722f44d60c45d481f18f0cd48.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/aabaf4f639968a50ade91a3eb3381a6ebfd7fbde9afe9337836f9889180c15d1de1eaa821ed2657793ee817b0402325ccd672cc722f44d60c45d481f18f0cd48.jpg",
          caption:
            "The second bedroom is just as comfortable and chic as the first one."
        },
        {
          id: 29334,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/51280d381da24bcd009d7c3919cd8ddfee975e5b8e852a22a236da3eb06fbacfe5dd7add9adb6ccad40abc8094c2e527fa6cb5f3d122556d319fe532e55e6a0d.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/51280d381da24bcd009d7c3919cd8ddfee975e5b8e852a22a236da3eb06fbacfe5dd7add9adb6ccad40abc8094c2e527fa6cb5f3d122556d319fe532e55e6a0d.jpg",
          caption:
            "We will provide clean linens and towels for you to enjoy 5-star hotel quality with home comfort."
        },
        {
          id: 29335,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/8ab3a2ddc82546906c422a817beacf52b0bc7af30338038ddc1dd44d4d33fd38c8c17aa74719905819f78223614a17690537f152560dffdf14996b3b44cc743c.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/8ab3a2ddc82546906c422a817beacf52b0bc7af30338038ddc1dd44d4d33fd38c8c17aa74719905819f78223614a17690537f152560dffdf14996b3b44cc743c.jpg",
          caption: "You can create wonderful memories here."
        },
        {
          id: 29336,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/1b1edfc2d6a395fc6db703b029ecbea037edca1d3f6e2bb832feba059c271ebfad16054928c987ab791054452499446fb7d4501234e5d2cbcc5f13fcc47d4b24.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/1b1edfc2d6a395fc6db703b029ecbea037edca1d3f6e2bb832feba059c271ebfad16054928c987ab791054452499446fb7d4501234e5d2cbcc5f13fcc47d4b24.jpg",
          caption:
            "Book now for an unforgettable home experience in the heart of the city!"
        }
      ],
      space: "70",
      rooms_bedrooms_count: 2,
      rooms_bathrooms_count: 2,
      city: {
        id: 34,
        name: "İSTANBUL"
      },
      district: {
        id: 434,
        name: "BEYOĞLU"
      },
      approx_lat: 41.0352469,
      approx_lng: 28.9927622,
      nickname: "ADORE-M",
      is_fav: false,
      available_on: null,
      title: "Splendid Flat with Excellent Location in Beyoglu",
      slug: "splendid-flat-with-excellent-location-in-beyoglu",
      price: {
        final: "890 ₺",
        listing: "855 ₺",
        average_daily_price: "213.75 ₺",
        discount_percentage: null,
        total_discount_price: null,
        cleaning_fee: "35 ₺",
        total_nights: 4,
        sub_total: "855 ₺",
        original_average_daily_price: null,
        breakdown: {
          "213.75 ₺ x 4 %nights%": "855 ₺",
          "%Sub Total%": "855 ₺",
          "%Cleaning Fee%": "35 ₺",
          hr1: "br",
          "%Total%": "890 ₺"
        }
      }
    },
    {
      uuid: "c8c3a4fa-48bb-4dcb-8211-1ee49589cc00",
      occupancy: 4,
      min_nights: 3,
      pictures: [
        {
          id: 44944,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/b1e81f2f89c1fef22dcb299de0e1607674e44455a8e318334b0504fa6883d9f379fd15a1aa1399f8c857a3859e6aecc6271993ee6d157227fa208812026e4dac.jpeg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/b1e81f2f89c1fef22dcb299de0e1607674e44455a8e318334b0504fa6883d9f379fd15a1aa1399f8c857a3859e6aecc6271993ee6d157227fa208812026e4dac.jpeg",
          caption: "You can sit back and sip your wine peacefully here."
        },
        {
          id: 44943,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/3decdd622179d49c17b5312c098f333b60be021a05ecef3cc2ec71245ad1e8cccd20b0d60a005a916cbf7aa9fe64cfd723754d045cefb556dcc8c97249a9febd.jpeg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/3decdd622179d49c17b5312c098f333b60be021a05ecef3cc2ec71245ad1e8cccd20b0d60a005a916cbf7aa9fe64cfd723754d045cefb556dcc8c97249a9febd.jpeg",
          caption: "Welcome to Alcazar!"
        },
        {
          id: 44938,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/5ce297ba669821042ad916e89187bc8e0ac172b5b1f08e92999f8527a615e8f26ddd5827aa6d7d77f201376522492106f28f63be958cb15bf1d336b18b099291.jpeg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/5ce297ba669821042ad916e89187bc8e0ac172b5b1f08e92999f8527a615e8f26ddd5827aa6d7d77f201376522492106f28f63be958cb15bf1d336b18b099291.jpeg",
          caption:
            "Explore all the beauties of Istanbul and make the most of your stay."
        },
        {
          id: 44945,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/e0eb2fd106daf33cb74d8b518a7f2213058c72209e3978f4999757f1da524888d0b959080faa174f9235cf3f5af713af3054991c4f4436c833417e1956d63c1e.jpeg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/e0eb2fd106daf33cb74d8b518a7f2213058c72209e3978f4999757f1da524888d0b959080faa174f9235cf3f5af713af3054991c4f4436c833417e1956d63c1e.jpeg",
          caption:
            "Our bright living room is a great place to relax and unwind."
        },
        {
          id: 44946,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/fe02e5bd56e27462d0633e159338358be7934d48e98cf8ee22f06be42df96cac6651520b54bf66c8cc5a9951910ba0655da8cae4c1d0bfde5289b596a6a2f4f4.jpeg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/fe02e5bd56e27462d0633e159338358be7934d48e98cf8ee22f06be42df96cac6651520b54bf66c8cc5a9951910ba0655da8cae4c1d0bfde5289b596a6a2f4f4.jpeg",
          caption: "Experience hotel quality and home comfort together."
        },
        {
          id: 44951,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/29cc3daa27ddf7de073e7a9ff3967c5f624e85310262c81199f10a78bc7338403707b026a7b9976b466830dc6226c7a9b4ad060bf05fb6efd515f078fbed718a.jpeg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/29cc3daa27ddf7de073e7a9ff3967c5f624e85310262c81199f10a78bc7338403707b026a7b9976b466830dc6226c7a9b4ad060bf05fb6efd515f078fbed718a.jpeg",
          caption: "You will wake up to the most exciting days of your life."
        },
        {
          id: 44941,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/caef2157a6563382b686ecf8af6efa3683ccc409a23849ca9e5eff977fb8e8b2aed81ef27f678869ebd0545516d851944372522a4fa96085ab20ace6fe7a72b7.jpeg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/caef2157a6563382b686ecf8af6efa3683ccc409a23849ca9e5eff977fb8e8b2aed81ef27f678869ebd0545516d851944372522a4fa96085ab20ace6fe7a72b7.jpeg",
          caption: "Everything you might need will be available here."
        },
        {
          id: 44953,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/9fc44a873bd0449468f5af7ce932b74a7959c4d66882404abb16982b2baa02d8cdeef8fac6938fb9876550afcab8c7db2e8d3c8dcb7d107761cfe1074b330dac.jpeg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/9fc44a873bd0449468f5af7ce932b74a7959c4d66882404abb16982b2baa02d8cdeef8fac6938fb9876550afcab8c7db2e8d3c8dcb7d107761cfe1074b330dac.jpeg",
          caption:
            "Start your day with a traditional Turkish breakfast at this table."
        },
        {
          id: 44952,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/0fafb71fe9d1baac0f2a2327c709e0f20c549147fcb94640022ca15bb03d2717923b43e9877986cfd1f3a63d8b583b66e7fcf5e9b6aef1a10c231f23803eb68c.jpeg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/0fafb71fe9d1baac0f2a2327c709e0f20c549147fcb94640022ca15bb03d2717923b43e9877986cfd1f3a63d8b583b66e7fcf5e9b6aef1a10c231f23803eb68c.jpeg",
          caption: "Recharge your batteries in this exceptional apartment."
        },
        {
          id: 44942,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/3a33b7ad088dee21677e2a2c4d98f32fb4cbe7b4a58aadfc4796cc714a385677f77cda1d13f70336f86352f467a8955347b2bee512c57ec9d0ddb490fc4b6c03.jpeg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/3a33b7ad088dee21677e2a2c4d98f32fb4cbe7b4a58aadfc4796cc714a385677f77cda1d13f70336f86352f467a8955347b2bee512c57ec9d0ddb490fc4b6c03.jpeg",
          caption: "Our fully-equipped kitchen has top-quality appliances."
        },
        {
          id: 44948,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/6348bdba520cec1a3c70858123bff1511585f15b61da5bfc341671211b9745185e885d938f8ef2c8c05a1e3186e1cc51a593ec6cd66cf9207ccf37ff69d67969.jpeg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/6348bdba520cec1a3c70858123bff1511585f15b61da5bfc341671211b9745185e885d938f8ef2c8c05a1e3186e1cc51a593ec6cd66cf9207ccf37ff69d67969.jpeg",
          caption: "Our bedrooms are decorated with soft and pastel tones."
        },
        {
          id: 44949,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/da2995bb9ad752981de7be927f6ab29331b062c79a41e153de72f499099150cc65c98c464823b849758c7531741d53d71a93cee4e6970470301796a698d7b26d.jpeg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/da2995bb9ad752981de7be927f6ab29331b062c79a41e153de72f499099150cc65c98c464823b849758c7531741d53d71a93cee4e6970470301796a698d7b26d.jpeg",
          caption:
            "We have thought of everything to provide you a safe and calming atmosphere."
        },
        {
          id: 44950,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/7a7bbcdea05d9f78e2f380af25b7abaafa70e4037d276653c9cbb73d33f8713f83da8c656d839af8b0b8aea7896d4798f95364d51e03a8d8816ff0a3c125968d.jpeg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/7a7bbcdea05d9f78e2f380af25b7abaafa70e4037d276653c9cbb73d33f8713f83da8c656d839af8b0b8aea7896d4798f95364d51e03a8d8816ff0a3c125968d.jpeg",
          caption:
            "Fresh linens and towels will be provided before your arrival."
        },
        {
          id: 44937,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/487d97f377b50a8cb2df7486757d1707283188516c92e539524be9968f2300c6f270711a8e0109ea8e4ab346175db1c08ece5cc67c10f7bb00e3d85bc4453e68.jpeg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/487d97f377b50a8cb2df7486757d1707283188516c92e539524be9968f2300c6f270711a8e0109ea8e4ab346175db1c08ece5cc67c10f7bb00e3d85bc4453e68.jpeg",
          caption: "Every corner of our flat is clean and spotless."
        },
        {
          id: 44936,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/19eb2eda1b3287491a5d4461297b5664766b66220ea1386d5ce5a431c750ab42e5dbc0c7aeef7c82f8796fbb5c91941249211e3bb62ca0c5ddcc3cfb1965ef5d.jpeg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/19eb2eda1b3287491a5d4461297b5664766b66220ea1386d5ce5a431c750ab42e5dbc0c7aeef7c82f8796fbb5c91941249211e3bb62ca0c5ddcc3cfb1965ef5d.jpeg",
          caption: "You don't have to worry about hygiene here."
        },
        {
          id: 44954,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/f331a49e4c589e25a4e1732c324fd5f9e014e422aa4c0af21d6feb58f1d23a7e8210557addbfc13d681ae2b7a052b35ad56c9a43ec5cbde76814db76da1120f9.jpeg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/f331a49e4c589e25a4e1732c324fd5f9e014e422aa4c0af21d6feb58f1d23a7e8210557addbfc13d681ae2b7a052b35ad56c9a43ec5cbde76814db76da1120f9.jpeg",
          caption:
            "If you need a pleasant getaway to clear up your mind, book now!"
        }
      ],
      space: "79",
      rooms_bedrooms_count: 2,
      rooms_bathrooms_count: 1,
      city: {
        id: 34,
        name: "İSTANBUL"
      },
      district: {
        id: 434,
        name: "BEYOĞLU"
      },
      approx_lat: 41.025575,
      approx_lng: 28.9759222,
      nickname: "ALCAZAR-M",
      is_fav: false,
      available_on: null,
      title: "Historical Building 2 min to Galata Tower",
      slug: "historical-building-2-min-to-galata-tower",
      price: {
        final: "946 ₺",
        listing: "906 ₺",
        average_daily_price: "226.5 ₺",
        discount_percentage: null,
        total_discount_price: null,
        cleaning_fee: "40 ₺",
        total_nights: 4,
        sub_total: "906 ₺",
        original_average_daily_price: null,
        breakdown: {
          "226.5 ₺ x 4 %nights%": "906 ₺",
          "%Sub Total%": "906 ₺",
          "%Cleaning Fee%": "40 ₺",
          hr1: "br",
          "%Total%": "946 ₺"
        }
      }
    },
    {
      uuid: "ca9d333b-8f4d-4860-9b87-9b001fb59b77",
      occupancy: 4,
      min_nights: 3,
      pictures: [
        {
          id: 32383,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/61deed03693dece5fb739cc6fe71bd4eecb662587906551c92edf960d43a8682e0b2f44d7741fccb52e3392553901ad40333927ad579716bb29a8cda74f841ce.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/61deed03693dece5fb739cc6fe71bd4eecb662587906551c92edf960d43a8682e0b2f44d7741fccb52e3392553901ad40333927ad579716bb29a8cda74f841ce.jpg",
          caption: "Welcome to Brent!"
        },
        {
          id: 32384,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/2c133b3870bbea6b113523e83587fbf98e7b84650458b0c3ee5c79c500dbc48980632e44a7e15b8326a3ac878a11dcf4a4cc5376974d92618c1d1f3c88c1011a.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/2c133b3870bbea6b113523e83587fbf98e7b84650458b0c3ee5c79c500dbc48980632e44a7e15b8326a3ac878a11dcf4a4cc5376974d92618c1d1f3c88c1011a.jpg",
          caption:
            "Beautiful days start right here in this corner with invigorating coffee or tea, dealer's choice."
        },
        {
          id: 32386,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/637048eaad992f5e9d357f5e8fafa47b3c23c01fd905554c668ea1a3d5d54747e9be0ec6b3b2bae00387586d0d86fbdd9dc023608b663dc72b0691cf5b02a76c.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/637048eaad992f5e9d357f5e8fafa47b3c23c01fd905554c668ea1a3d5d54747e9be0ec6b3b2bae00387586d0d86fbdd9dc023608b663dc72b0691cf5b02a76c.jpg",
          caption: "Our sleek flat is ready to host you."
        },
        {
          id: 32385,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/aa0d2dd40f8b1f203c660b9e93a76a168a07061d42df46265d1cb4c22135c2fd6d365f33827567bdca4c7d28f5987de2fc82cf561cb54199ada9dba9c5c1aae5.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/aa0d2dd40f8b1f203c660b9e93a76a168a07061d42df46265d1cb4c22135c2fd6d365f33827567bdca4c7d28f5987de2fc82cf561cb54199ada9dba9c5c1aae5.jpg",
          caption: "Various amenities will be at your disposal."
        },
        {
          id: 32378,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/9287615f18d6606683104d5977e10b6ba38063d6026c453aa3e9172938ac5b69762545d07810c23c9d22392ce4a18e11a81534f379ef3c784276f7fdf1c5ad02.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/9287615f18d6606683104d5977e10b6ba38063d6026c453aa3e9172938ac5b69762545d07810c23c9d22392ce4a18e11a81534f379ef3c784276f7fdf1c5ad02.jpg",
          caption:
            "The living room is stylish, embracing trends as well as authenticity."
        },
        {
          id: 32380,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/49bd5f0b9b109791518e0982beb4c3d36a669a2a81787dc61e82c9468eab8482806a01a9593d209c35c11cadff649a761c6aefc649d3c3a4f40b4e4d008fbc80.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/49bd5f0b9b109791518e0982beb4c3d36a669a2a81787dc61e82c9468eab8482806a01a9593d209c35c11cadff649a761c6aefc649d3c3a4f40b4e4d008fbc80.jpg",
          caption:
            "We combined the traditional design elements with modern pieces to create an eclectic and warm environment."
        },
        {
          id: 32390,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/b5d0bf73f91937a20857559d419ad01924c884c5bfe63527cc5f97a4cc3939dbc96b2733596b043a0effd143054b2a539228cb54d688e48e79d8d66a6af54dc5.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/b5d0bf73f91937a20857559d419ad01924c884c5bfe63527cc5f97a4cc3939dbc96b2733596b043a0effd143054b2a539228cb54d688e48e79d8d66a6af54dc5.jpg",
          caption:
            "Before your arrival, we will provide clean linens and towels to give you a 5-star hotel-like experience."
        },
        {
          id: 32379,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/fe440f466badc31f2dd39e1365d4208352f54ccc34b3fe0be635d7c3acff50a6631e8bf130d538f7e86bdfd22c2738b7d50cfe725cd2ac162bc5703423ea76c9.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/fe440f466badc31f2dd39e1365d4208352f54ccc34b3fe0be635d7c3acff50a6631e8bf130d538f7e86bdfd22c2738b7d50cfe725cd2ac162bc5703423ea76c9.jpg",
          caption:
            "Our apartment offers a cozy and safe shelter in the heart of the city."
        },
        {
          id: 32381,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/c3090008b213cc01cfed1ce677f9ef9b4b716ea157512e05088390cb60dfc655dbe8e525dc9958088cb3fe66a69615932900856d2b6347f8280f511a1d761e3d.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/c3090008b213cc01cfed1ce677f9ef9b4b716ea157512e05088390cb60dfc655dbe8e525dc9958088cb3fe66a69615932900856d2b6347f8280f511a1d761e3d.jpg",
          caption:
            "Our rooms are inviting, simple yet functional and eye-pleasing."
        },
        {
          id: 32382,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/cbad453cdb7abe454e1886130046040ebcc450ec20476a55a49790cb4e33e49d7982ec03ee6e0c22500296b5ad6cc93e5342399005771c5f20b77ccec91f7e3b.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/cbad453cdb7abe454e1886130046040ebcc450ec20476a55a49790cb4e33e49d7982ec03ee6e0c22500296b5ad6cc93e5342399005771c5f20b77ccec91f7e3b.jpg",
          caption:
            "You will find the comfort and convenience you are looking for here."
        },
        {
          id: 32388,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/44cedc8818e0a107b2e1f730c5c413ba02d5d4efc856d6cbb09bb016749dcba709d7b533b8211179118735d58cb2185e381ed440a12c96a050f76f8e02505fe1.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/44cedc8818e0a107b2e1f730c5c413ba02d5d4efc856d6cbb09bb016749dcba709d7b533b8211179118735d58cb2185e381ed440a12c96a050f76f8e02505fe1.jpg",
          caption:
            "The kitchen is fully equipped with the necessary items you may need during your stay."
        },
        {
          id: 32387,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/b33303a134f13966cc1dad20fef503c26be41d8153c72e07be8713a8a97349dced70195afe70636ac74bc6c037e7155dca3c29ff0b2838c1f28791bb28e0d806.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/b33303a134f13966cc1dad20fef503c26be41d8153c72e07be8713a8a97349dced70195afe70636ac74bc6c037e7155dca3c29ff0b2838c1f28791bb28e0d806.jpg",
          caption:
            "Well-thought-out details turn this iconic Beyoglu home into a contemporary sanctuary."
        },
        {
          id: 32389,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/2b0d932ba2195da5e823304c9f256b7f135f20725054073a37da6886df73ec041f7e7d2ee2b7c314e04cecff4f380c2a992d73cd4e186968b5ad72939dc22a11.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/2b0d932ba2195da5e823304c9f256b7f135f20725054073a37da6886df73ec041f7e7d2ee2b7c314e04cecff4f380c2a992d73cd4e186968b5ad72939dc22a11.jpg",
          caption:
            "The bedroom includes a comfy double bed, assures restful nights."
        },
        {
          id: 32392,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/aef44c4e1f949d3f6b2799d8f51e5ad0b3dac845920a1e2ab59affba8f76bf7dbbdc30c3371abb2c2cd0f211ff9308159b42f6183482af9a02ed8399dc4815ee.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/aef44c4e1f949d3f6b2799d8f51e5ad0b3dac845920a1e2ab59affba8f76bf7dbbdc30c3371abb2c2cd0f211ff9308159b42f6183482af9a02ed8399dc4815ee.jpg",
          caption: "You don't have to worry about hygiene here."
        },
        {
          id: 32391,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/fc8a34864e3312644a7da8b7104495d401cbe41f8e774c8a96e7637833118f170b9b94aae11cc0e5278a533016b472907456b4ffb9a8cd323f5489425fb3af59.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/fc8a34864e3312644a7da8b7104495d401cbe41f8e774c8a96e7637833118f170b9b94aae11cc0e5278a533016b472907456b4ffb9a8cd323f5489425fb3af59.jpg",
          caption: "Every corner of our home is clean and spotless."
        },
        {
          id: 32393,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/15a50a92af534d96aed271d0604484bedeca227468ebbd64b5cc4d28b552a6245a1a190059a41fb109c3b0efcb4d568508df34a2e595167f4069294c6532ab1f.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/15a50a92af534d96aed271d0604484bedeca227468ebbd64b5cc4d28b552a6245a1a190059a41fb109c3b0efcb4d568508df34a2e595167f4069294c6532ab1f.jpg",
          caption:
            "To sense the hospitality Beyoglu offers to the fullest, book now!"
        }
      ],
      space: "60",
      rooms_bedrooms_count: 2,
      rooms_bathrooms_count: 1,
      city: {
        id: 34,
        name: "İSTANBUL"
      },
      district: {
        id: 434,
        name: "BEYOĞLU"
      },
      approx_lat: 41.0449733,
      approx_lng: 28.979160399999998,
      nickname: "BRENTFM",
      is_fav: false,
      available_on: null,
      title: "Eclectic Apartment near Popular Attractions in Beyoglu",
      slug: "eclectic-apartment-near-popular-attractions-in-beyoglu",
      price: {
        final: "475 ₺",
        listing: "440 ₺",
        average_daily_price: "110 ₺",
        discount_percentage: null,
        total_discount_price: null,
        cleaning_fee: "35 ₺",
        total_nights: 4,
        sub_total: "440 ₺",
        original_average_daily_price: null,
        breakdown: {
          "110 ₺ x 4 %nights%": "440 ₺",
          "%Sub Total%": "440 ₺",
          "%Cleaning Fee%": "35 ₺",
          hr1: "br",
          "%Total%": "475 ₺"
        }
      }
    },
    {
      uuid: "4a714a6c-31bf-4939-a06d-49c96deaa2c4",
      occupancy: 4,
      min_nights: 3,
      pictures: [
        {
          id: 27821,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/89d2c4511a6b9e393f96e461ee5069aabe5b83452d47bae63064bd7e12fded33824d38fa9d0f97e79b6c58302af7ad8bce50435b69bf40653c1d3a72dbaaec24.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/89d2c4511a6b9e393f96e461ee5069aabe5b83452d47bae63064bd7e12fded33824d38fa9d0f97e79b6c58302af7ad8bce50435b69bf40653c1d3a72dbaaec24.jpg",
          caption: "Welcome to Dragon!"
        },
        {
          id: 27822,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/00e71ecfca2d1ed0a1dc318dae21dbbb19c2b5fd2586fd7c81997c0e9471aab335976347c083999eee2a1c9d695845fc391618dfd66ad45ecadd5b029f9204bb.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/00e71ecfca2d1ed0a1dc318dae21dbbb19c2b5fd2586fd7c81997c0e9471aab335976347c083999eee2a1c9d695845fc391618dfd66ad45ecadd5b029f9204bb.jpg",
          caption: "An incredible home experience is what you'll find here."
        },
        {
          id: 27823,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/9d793d706ca86180c941e29fd85b831a3489b0d45ddfdcec285e05d490858ba9bdaf9866721f20ee5df81ac2cec3f55c3720be6969a27cd1503ee8dcf4d901ac.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/9d793d706ca86180c941e29fd85b831a3489b0d45ddfdcec285e05d490858ba9bdaf9866721f20ee5df81ac2cec3f55c3720be6969a27cd1503ee8dcf4d901ac.jpg",
          caption: "You will feel 5-star hotel quality."
        },
        {
          id: 27824,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/c3b4927436bde151cd5746750d51e8d1693cc0ad281fb90b420236e503f4a2431893b5b9e34b15ebcdbc91d2b629bcb83996811e3f93d956dcbccf3a13c59834.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/c3b4927436bde151cd5746750d51e8d1693cc0ad281fb90b420236e503f4a2431893b5b9e34b15ebcdbc91d2b629bcb83996811e3f93d956dcbccf3a13c59834.jpg",
          caption: "Anything you might need will be available."
        },
        {
          id: 27825,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/32b413f651a878df4d0af4d307e44c724a4d08888f1be87bfa8479f169207e5b441346d9d641905a1953ffe80c10bcfb27f5b5f43afa618bc4db16a6e47ae180.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/32b413f651a878df4d0af4d307e44c724a4d08888f1be87bfa8479f169207e5b441346d9d641905a1953ffe80c10bcfb27f5b5f43afa618bc4db16a6e47ae180.jpg",
          caption: "Various amenities will be at your disposal."
        },
        {
          id: 27826,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/48c75b1ccdef7dc0e77c644523de8cbb51c2709a137308927abece752ee062bc1a21702d48cc90870d7dc35391403c2a69dd77c01de18d40e8199e2158371bb6.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/48c75b1ccdef7dc0e77c644523de8cbb51c2709a137308927abece752ee062bc1a21702d48cc90870d7dc35391403c2a69dd77c01de18d40e8199e2158371bb6.jpg",
          caption: null
        },
        {
          id: 27827,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/d05ff83923a1208be81fb0b8e027163f4f9f015435ff264eae039e4e3765998c91790559fba91d5ae721b790c127c1ca5fa4e9babdc9c99e90a176b7e28eac0c.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/d05ff83923a1208be81fb0b8e027163f4f9f015435ff264eae039e4e3765998c91790559fba91d5ae721b790c127c1ca5fa4e9babdc9c99e90a176b7e28eac0c.jpg",
          caption: null
        },
        {
          id: 27828,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/ea845f3491e2b376e1e0b1ecbbf5aaa1fc3710180a757f437b70082f18e29cc656746faffa5f86a4565bc2237814bdc0e1825863f9f1200d023103399a615ec1.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/ea845f3491e2b376e1e0b1ecbbf5aaa1fc3710180a757f437b70082f18e29cc656746faffa5f86a4565bc2237814bdc0e1825863f9f1200d023103399a615ec1.jpg",
          caption: null
        },
        {
          id: 27829,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/8eb1ea780c243edb10a1fd5d7a7b28ff62bc460c4483622aebd6ab81b64b6a969690f2aaa472a6647828cd099925ae7dfba7c7b3cd0471ebff16ad04299c1dbc.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/8eb1ea780c243edb10a1fd5d7a7b28ff62bc460c4483622aebd6ab81b64b6a969690f2aaa472a6647828cd099925ae7dfba7c7b3cd0471ebff16ad04299c1dbc.jpg",
          caption: null
        },
        {
          id: 27830,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/894ecd8fac0775b9fb88008dd6e3ce664eccb6dc2cef1d1f2dba950ee8254ce2405b5ab7a976bda5e84dc65e8c433d7dc8a4c3405e4e072faeec29752f41c469.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/894ecd8fac0775b9fb88008dd6e3ce664eccb6dc2cef1d1f2dba950ee8254ce2405b5ab7a976bda5e84dc65e8c433d7dc8a4c3405e4e072faeec29752f41c469.jpg",
          caption: null
        },
        {
          id: 27831,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/b7ee95166b0a9f07316cc2cdd1f47584a7fdab77fe47f6d278a6e802e33c31ee3a8543a573a8a099ccdcda617307de5afaf5eb35555ea457fcf661e7ca804024.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/b7ee95166b0a9f07316cc2cdd1f47584a7fdab77fe47f6d278a6e802e33c31ee3a8543a573a8a099ccdcda617307de5afaf5eb35555ea457fcf661e7ca804024.jpg",
          caption: null
        },
        {
          id: 27832,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/7d08ffbf2cc5bdb73739f9a5e239b076285c34efd9a0f3636c08a4db77ad9842c436eb40861313fb77e53d5a39bd939bb6f212e40e7c8d9440303fdfb1d2f5f2.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/7d08ffbf2cc5bdb73739f9a5e239b076285c34efd9a0f3636c08a4db77ad9842c436eb40861313fb77e53d5a39bd939bb6f212e40e7c8d9440303fdfb1d2f5f2.jpg",
          caption: null
        },
        {
          id: 27833,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/1e5b6f436075bda4413c5ecfb4d37b4ec940ebb4150393a78a01f78a0af2a86c1c350cdd4ca2226eb6b284d4174398e92d31424ce8b1b98467e81562366e53c1.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/1e5b6f436075bda4413c5ecfb4d37b4ec940ebb4150393a78a01f78a0af2a86c1c350cdd4ca2226eb6b284d4174398e92d31424ce8b1b98467e81562366e53c1.jpg",
          caption: null
        },
        {
          id: 27834,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/4b0d7c9c9e1f3cd2bf9d356efe76cfbecfdb19ee693905787e7bf411091d104c9c80d947c8d1452a3b21c76749099c15bdefb81f176d5ecdebea3960b320e8ea.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/4b0d7c9c9e1f3cd2bf9d356efe76cfbecfdb19ee693905787e7bf411091d104c9c80d947c8d1452a3b21c76749099c15bdefb81f176d5ecdebea3960b320e8ea.jpg",
          caption: null
        },
        {
          id: 27835,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/9a5054c57f6608dbbf24180418a40da4378cee532de46d0355949974038dafa98310f76faa78b7be046f25803a294b36565fce80e91494ef4067c547b1569302.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/9a5054c57f6608dbbf24180418a40da4378cee532de46d0355949974038dafa98310f76faa78b7be046f25803a294b36565fce80e91494ef4067c547b1569302.jpg",
          caption: null
        },
        {
          id: 27836,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/f8871cc0f3d76ad944d2c09c90446cb10037915d8882fd6e46b6abb3ae7f375ed80f73cdb974d82235814b8783447a6a15aa141b89e7bf0c4e00e24403ad81d1.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/f8871cc0f3d76ad944d2c09c90446cb10037915d8882fd6e46b6abb3ae7f375ed80f73cdb974d82235814b8783447a6a15aa141b89e7bf0c4e00e24403ad81d1.jpg",
          caption: null
        },
        {
          id: 27837,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/82795d2a5a00f17fa08d00452dd35aa14cfd1c72bd85d16ab5562833e7097f210960432214f0b872a563a445ac60f3b54f95f53ac9fa9729280f7581e078fdf2.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/82795d2a5a00f17fa08d00452dd35aa14cfd1c72bd85d16ab5562833e7097f210960432214f0b872a563a445ac60f3b54f95f53ac9fa9729280f7581e078fdf2.jpg",
          caption: null
        },
        {
          id: 27838,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/6e27e05ec23679ab76b62cd41135cb8a96eeabb981087cb10741e2794c590aa9c134136450b01f995cdd27a1f0405de41bfb0d1f64a788fcfeee0dd3cb84662a.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/6e27e05ec23679ab76b62cd41135cb8a96eeabb981087cb10741e2794c590aa9c134136450b01f995cdd27a1f0405de41bfb0d1f64a788fcfeee0dd3cb84662a.jpg",
          caption: null
        },
        {
          id: 27839,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/9ef951f1a1515d92ff6e845519dfedf7caa3262fee174f2a913ae24665e588e1839b62d41464ef66c0e9eeda9a65046386dbb2959792ba399b7bb5b51d009aed.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/9ef951f1a1515d92ff6e845519dfedf7caa3262fee174f2a913ae24665e588e1839b62d41464ef66c0e9eeda9a65046386dbb2959792ba399b7bb5b51d009aed.jpg",
          caption: null
        },
        {
          id: 27840,
          path: "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w700/103f36fba79cdc3b2cdb2110661ae015eb7f98aeadc451cc3169d57a626223efdbeb25032c4526e688c5e19a21bba74217991a5454a5145662782d42b0aea884.jpg",
          path_extra:
            "https://missafirpms.s3.eu-central-1.amazonaws.com/missafir/media/cache/home_list_image_16by9_w1300/103f36fba79cdc3b2cdb2110661ae015eb7f98aeadc451cc3169d57a626223efdbeb25032c4526e688c5e19a21bba74217991a5454a5145662782d42b0aea884.jpg",
          caption: null
        }
      ],
      space: "80",
      rooms_bedrooms_count: 2,
      rooms_bathrooms_count: 2,
      city: {
        id: 34,
        name: "İSTANBUL"
      },
      district: {
        id: 434,
        name: "BEYOĞLU"
      },
      approx_lat: 41.0287551,
      approx_lng: 28.9804894,
      nickname: "DRAGONFM",
      is_fav: false,
      available_on: null,
      title: "Stylish Duplex with Terrace 650 m to Galata Tower",
      slug: "stylish-duplex-with-terrace-650-m-to-galata-tower",
      price: {
        final: "1152 ₺",
        listing: "1102 ₺",
        average_daily_price: "275.5 ₺",
        discount_percentage: null,
        total_discount_price: null,
        cleaning_fee: "50 ₺",
        total_nights: 4,
        sub_total: "1102 ₺",
        original_average_daily_price: null,
        breakdown: {
          "275.5 ₺ x 4 %nights%": "1102 ₺",
          "%Sub Total%": "1102 ₺",
          "%Cleaning Fee%": "50 ₺",
          hr1: "br",
          "%Total%": "1152 ₺"
        }
      }
    }
  ],
  banner: {
    title: "Sign up for our newsletter",
    description:
      "Be the first to know about releases and industry news and insights.",
    link: "/"
  },
  cities: [
    { value: "1", label: "İçmeler, Marmaris/Muğla, Türkiye", code: 1 },
    { value: "2", label: "Şişli, İstanbul, Türkiye", code: 1 },
    { value: "3", label: "Amasra, Bartın, Türkiye", code: 1 }
  ],

  properties: [
    { value: "1", label: "Apartman" },
    { value: "2", label: "Villa" },
    { value: "3", label: "Yalı" }
  ],

  rooms: [
    { value: "1", label: "Studio" },
    { value: "2", label: "1+1" },
    { value: "3", label: "2+1" },
    { value: "4", label: "3+1" }
  ]
};

const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    updateCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateSelectedOwnerType: (state, action) => {
      state.selectedOwnerType = action.payload;
    }
  }
});

export const { updateCurrentStep, updateSelectedOwnerType } =
  ownerSlice.actions;

export default ownerSlice.reducer;
