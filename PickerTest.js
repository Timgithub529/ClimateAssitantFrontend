
// Test aufbau des Pickers Veraltet
function ProjectsScreen  ({ navigation }) {
    const [selectedValue, setSelectedValue] = useState('');
    const [productDetails , setproductDetails] = useState([]);
  
    useEffect(() => {
      getProductList("http://192.168.10.127:8080/api/fundprogram/jobs", setproductDetails);
    }, []);
  
    const getProductList = async (url, method) => {
      //const token = await deviceStorage.getItem('id_token');
      try{
      const response = await fetch(url, {
  
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          //'Authentication': `Bearer ${token}`
        },
      });
  
        const json = await response.json();
        method(json);
        console.log("Test" + json)
      } catch (err){
        console.error(err);
      }
  
    };
  
    const renderProductList = (list) => {
      return list.map((product) => {
        return <Picker.Item label={product.name} value={product.name} />
      })
    }
  
  
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={selectedValue}
          style={{height: 40, width: 150}}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            console.log(itemValue);
          }}
        >
           <Picker.Item label='Job' value='*' ></Picker.Item>
          { renderProductList(productDetails)
          }
  
        </Picker>
      </View>
    );
  };