import type { CredentialResponse } from 'vue3-google-signin'
import jwtDecode from 'jwt-decode'

export function accountFromGoogleResponse(response: CredentialResponse): GoogleAccount {
  const { email, given_name, family_name, picture }: GoogleJWT = jwtDecode(response.credential || '')

  return {
    client: 'google',
    firstName: given_name,
    lastName: family_name,
    email,
    image: picture || '',
  }
}
