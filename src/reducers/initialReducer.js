// const initialState = {
//     loading: false,
//     error: null,
//     played: 0,
//     wins: 0,
//     losses: 0
// };

// const initialReducer = (state = initialState, action) => {
//     if (action.type === 'STAT') {
//         return Object.assign({}, state, {
//             loading: true
//         });
//     }
//     if (action.type === 'STAT_ERROR') {
//         return Object.assign({}, state, {
//             loading: false,
//             error: action.value
//         });
//     }
//     if (action.type === 'STAT_SUCCESS') {
//         return Object.assign({}, state, {
//             loading: false,
//             error: null,
//             played: action.value.played,
//             wins: action.value.wins,
//             losses: action.value.losses
//         });
//     }
//     else {
//         return state;
//     }
// }
// export default initialReducer;