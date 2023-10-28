import { gql } from 'urql';

export const RecommendProfiles = gql`
  query RecommendedProfiles {
    recommendedProfiles{
        id
        name
        bio
        picture {
          ... on MediaSet {
            original {
              url
            }
          }
        }
        handle
        stats {
          totalFollowers
        }
    }
  }
`

export const UserProfile = gql`
  query UserProfile($request: ProfileQueryRequest!) {
    profiles(request: $request){
    items{
      name
      handle
      picture {
        ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        	}
      	}
      }
    }
    }
  }
`
export const GetProfilesRevenueQuery = gql`
  query GetProfilesRevenueQuery($request:  ProfileFollowRevenueQueryRequest!) {
    profileFollowRevenue(request: $request){
      revenues
      {
        total{
          asset
          {
            name
            symbol
          }
          value
        }
      }
    }

  }`


export const GetProfilesQuery = gql`
  query GetProfilesQuery($request: SingleProfileQueryRequest! ) {

    profile(request: $request) {
    id
    name
    bio
    attributes {
      displayType
      traitType
      key
      value
    }
    followNftAddress
    metadata
    isDefault
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
      __typename
    }
    handle
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
      __typename
    }
    ownedBy
    dispatcher {
      address
      canUseRelay
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
    followModule {
      ... on FeeFollowModuleSettings {
        type
        amount {
          asset {
            symbol
            name
            decimals
            address
          }
          value
        }
        recipient
      }
      ... on ProfileFollowModuleSettings {
        type
      }
      ... on RevertFollowModuleSettings {
        type
      }
    }
  }
  }
`

export const GetUserPosts = gql`
  query GetUserPosts($request: SingleProfileQueryRequest!) {
    profile(request: $request) {
    id
    name
    bio
    attributes {
      displayType
      traitType
      key
      value
    }
    followNftAddress
    metadata
    isDefault
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
      __typename
    }
    handle
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
      __typename
    }
    ownedBy
    dispatcher {
      address
      canUseRelay
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
    followModule {
      ... on FeeFollowModuleSettings {
        type
        amount {
          asset {
            symbol
            name
            decimals
            address
          }
          value
        }
        recipient
      }
      ... on ProfileFollowModuleSettings {
        type
      }
      ... on RevertFollowModuleSettings {
        type
      }
    }
  }
  }
`

const RecommendedProfiles = gql`
  query RecommendedProfiles {
    recommendedProfiles {
        id
        name
        picture {
          ... on MediaSet {
            original {
              url
            }
          }
        }
        handle
        stats {
          totalFollowers
        }
    }
  }
`


export const GetPosts = gql`
  query Publications($id: ProfileId!, $limit: LimitScalar) {
    publications(request: {
      profileId: $id,
      publicationTypes: [POST],
      limit: $limit
    }) {
      items {
        __typename
        ... on Post {
          ...PostFields
        }
      }
    }
  }
  fragment PostFields on Post {
    id
    metadata {
      ...MetadataOutputFields
    }
    createdAt
  }
  fragment MetadataOutputFields on MetadataOutput {
    name
    description
    content
    media {
      original {
        ...MediaFields
      }
    }
    attributes {
      displayType
      traitType
      value
    }
  }
  fragment MediaFields on Media {
    url
    mimeType
  }
`

export const GetNfts = gql`
  query GetNfts($address: EthereumAddress!) {
    nfts(request: {
      ownerAddress: $address,
      limit: 10,
      chainIds: [1,137]
    }) {
       items {
        contractName
        contractAddress
        symbol
        name
        description
        contentURI
        originalContent {
          uri
          metaType
        }

       }
    }
  }

`


export const GetBlogPost = gql`
  query GetBlogPost($address: [String!]!) {

      transactions(
        tags: [
          {
            name: "Contributor"
            values: $address
          }
        ]
        sort: HEIGHT_DESC
        first: 1
      ) {
        edges {
          node {
            id
          }
        }
      }
  }
`

export const ExploreProfiles = gql`
query ExploreProfiles($request: ExploreProfilesRequest!) {
  exploreProfiles(request: $request) {
    items {
      id
      name
      bio
      handle
      picture {
        ... on MediaSet {
          original {
            url
          }
        }
      }
      stats {
        totalFollowers
      }
    }
  }
}
`
