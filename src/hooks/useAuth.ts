import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthStorage } from '../util/storage';
import { getUserProfile } from '../api/backend/auth';
import { isNotEmptyString } from '../util/validation';

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile?: {
    avatar?: string;
  };
}

export const useAuth = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const validateToken = async () => {
    try {
      setIsLoading(true);
      const token = await AuthStorage.getToken();
      
      if (!token) {
        setIsAuthenticated(false);
        setUserProfile(null);
        return false;
      }

      const profile = await getUserProfile(token);
      const { first_name, last_name } = profile;
      const isValid = isNotEmptyString(first_name) && isNotEmptyString(last_name);

      setIsAuthenticated(isValid);
      setUserProfile(profile);

      if (!isValid) {
        navigation.navigate('UserName');
      }

      return isValid;
    } catch (error) {
      console.error('Error validating token:', error);
      setIsAuthenticated(false);
      setUserProfile(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return {
    isLoading,
    isAuthenticated,
    userProfile,
    validateToken
  };
}; 