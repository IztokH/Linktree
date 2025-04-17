declare module 'react-facebook-login' {
    import * as React from 'react';
  
    export interface ReactFacebookLoginProps {
      appId: string;
      autoLoad?: boolean;
      callback: (response: any) => void;
      onFailure?: (response: any) => void;
      fields?: string;
      scope?: string;
      cssClass?: string;
      textButton?: string;
      version?: string;
      isMobile?: boolean;
      tag?: string;
      icon?: string | React.ReactNode;
      language?: string;
      onClick?: () => void;
      cookie?: boolean;
      xfbml?: boolean;
      disableMobileRedirect?: boolean;
      isDisabled?: boolean;
    }
  
    const ReactFacebookLogin: React.FC<ReactFacebookLoginProps>;
    export default ReactFacebookLogin;
  }
  