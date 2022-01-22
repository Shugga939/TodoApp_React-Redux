import { useMemo } from 'react';

const useSortedTodos = (todos,sort)=> {
  return useMemo (()=> {
    if (sort === 'completed') {
      return [...todos].sort((a,b)=> (Number(a[sort])-Number(b[sort])))
    } else {
      return [...todos].sort((a,b)=> String(a[sort]).localeCompare(String(b[sort])))
    }
  },[sort,todos])
}

export const useTodos = (todos, sort, searchingValue)=> {
  let sortedTodos = useSortedTodos(todos,sort)
  let searchingTodos = useMemo (()=> {
    return sortedTodos.filter(
      (item)=> item.text.toLowerCase().includes(searchingValue.toLowerCase()))
  },[searchingValue, sortedTodos])
  return searchingTodos
}