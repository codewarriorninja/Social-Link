import { SignInButton, SignUpButton } from "@clerk/nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"


const UnAuthenticatedSidebar = () => {
  return (
    <div className="sticky top-20">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-4">Login to access your profile and connect with other</p>
          <SignInButton mode="modal">
            <Button className="w-full mt-2" variant={'default'}>
                Log In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="w-full mt-2" variant={'default'}>
                Sign Up
            </Button>
          </SignUpButton>
        </CardContent>
      </Card>
    </div>
  )
}

export default UnAuthenticatedSidebar