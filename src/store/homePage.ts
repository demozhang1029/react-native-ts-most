import {StackNavigator} from "react-navigation";
import HomeScreen from "../containers/pages/HomeScreen";
import {LoginPopup} from "../components/LoginPopup";

export const homePage = StackNavigator({
	Home: {screen: HomeScreen},
	LoginPopup: {screen: LoginPopup},
});