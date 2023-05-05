import * as S from './FlashMessageStyles';
import { Warning, SealWarning } from '@phosphor-icons/react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FlashMessageProps {
   message?: string;
   type?: 'success' | 'warning' | 'error' | 'default';
   haveButton?: boolean;
   handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
   FistButtonText?: string;
   SecondButtonText?: string;
}

export const FlashMessage = ({
   message = 'Digite um mensagem',
   type = 'default',
   haveButton,
   handleClick,
   FistButtonText = 'Clicar',
   SecondButtonText = 'Clicar',
}: FlashMessageProps) => {
   const { ref, inView } = useInView({
      threshold: 0, // o elemento sai da tela quando o valor é 0
   });
   const variants: Variants = {
      hidden: {
         opacity: 0,
         scale: 0,
      },
      visible: {
         opacity: 1,
         scale: 1.05,
         transition: {
            duration: 0.6,
            ease: 'easeInOut',
         },
      },
      exit: {
         opacity: 0,
         scale: 0.5,
         transition: {
            duration: 0.6,
            ease: 'easeInOut',
         },
      },
   } satisfies Variants;

   return (
      <>
         <S.Wrapper
            ref={ref}
            as={motion.div}
            variants={variants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            exit="exit"
            type={type}
         >
            {type === 'warning' && <Warning size={40} />}
            {type === 'default' && <Warning size={40} />}
            {type === 'success' && <Warning size={40} />}
            {type === 'error' && <SealWarning size={40} />}

            {haveButton ? (
               <S.ButtonWrapper>
                  <S.ContentMessage>{message}</S.ContentMessage>
                  <div>
                     <S.Button onClick={handleClick}>{FistButtonText}</S.Button>
                     <S.Button onClick={handleClick}>
                        {SecondButtonText}
                     </S.Button>
                  </div>
               </S.ButtonWrapper>
            ) : (
               <S.ContentMessage>{message}</S.ContentMessage>
            )}
         </S.Wrapper>
      </>
   );
};
