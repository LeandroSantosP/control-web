import { Box } from '../../atoms/Box/Box';
import { Icon } from '../../atoms/Icons/Icon';
import * as Select from '@radix-ui/react-select';
import * as S from './DashBoardHeaderStyles';
import SelectDemo from '../Select/Select';

export const DashBoardHeader = ({
   title,
   icon,
   hasFilter = true,
}: {
   title: string;
   icon?: any;
   hasFilter?: boolean;
}) => (
   <Box
      p="1rem"
      m="1rem 0"
      flexDirection="row"
      border="2px solid #000"
      borderRadius="1rem"
      width="100%"
      alignItems="center"
      gap="2rem"
      position="relative"
   >
      <S.Title>
         {icon && <Icon currentIcon={icon} />}
         {title}
      </S.Title>
      {hasFilter && (
         <div style={{ marginRight: '5rem' }}>
            <SelectDemo />
         </div>
      )}

      <S.UserImage>
         <img src="../../../shared/assets/balense.png" />
      </S.UserImage>
   </Box>
);
