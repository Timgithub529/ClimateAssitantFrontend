import {  Picker } from 'react-native';


async function getPickerContent (url = '') {

    const [productDetails , setproductDetails] = useState([]);

    useEffect(() => {
        getProductList();
      }, []);
    
      const getProductList = async () => {
        //const token = await deviceStorage.getItem('id_token');
    
        try{
            const myUrl = 'http://192.168.10.127:8080' + url;
        const response = await fetch(myUrl, {
    
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            //'Authentication': `Bearer ${token}`
          },
        });
    
          const json = await response.json();
          setproductDetails(json);
          console.log("Test" + json)
        } catch (err){
          console.error(err);
        }
    
      };

      const renderProductList = () => {
        return productDetails.map((product) => {
          return <Picker.Item label={product.name} value={product.name} />
        })
      }


    return(
        <>
        {
            renderProductList()
        }
             
        </>
           
        
    );
};

export default getPickerContent;