
export const getGames = () => ({ 
  url: '/', 
  method: 'get' 
})

export const getGameById = (id) => ({ 
  url: `/${id}`, 
  method: 'get' 
})

export const getAvailableMoves = (id, coords) => ({ 
  url: `/${id}/available-moves`,
  queryParams: coords,
  method: 'get'
})

export const movePiece = (id, body) => ({ 
  url:`/${id}/move`,
  method: 'put',
  body
})
