const initialUserState = {
    items: [],
    newProduct: false,
    Update: false,
    editItems: {},
    item: null

}

export function itemsReducer(state = initialUserState, action) {
    switch (action.type) {
        case 'GET_ITEMS':
            return {
                ...state,
                items: action.payload
            }

        // case "DELETE_ITEM": {
        //     const newItem = action.payload;
        //     let newArray = [];
        //     try {
        //       newArray = state.items.slice();
        //       for (let i = 0; i < newArray.length; i++) {
        //         if (newArray[i].id === newItem.id) {
        //           newArray.splice(i, 1);
        //           break;
        //         }
        //       }

        //       alert("User successfully deleted");
        //       return {
        //         ...state,
        //         items: newArray
        //       };
        //     } catch (error) {
        //       console.warn(error);
        //       alert("Something went wrong ");
        //       return {
        //         ...state
        //       };
        //     }
        //   }

        //  case "DELETE_ITEM":{
        //         let newItems = state.items.filter(item => {
        //          return action.payload._id !== item._id
        //      })
        //      return { ...state, items: newItems }
        // }
        case 'DELETE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            };
        case 'EDIT_ITEMS':
            console.log(action.payload)
            return {
                ...state,
                item: action.payload


            }
        case "GET_TOTAL_PRICE": {
            return { ...state, totalPrice: action.payload }
        }
        case 'UPDATE':
            return {
                ...state,
                Update: action.state
            }
        case 'NEW_ITEM':
            return {
                ...state,
                newProduct: action.state
            }
        default:
            return { ...state }
    }

}

