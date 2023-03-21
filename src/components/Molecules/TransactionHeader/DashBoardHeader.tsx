import { Box } from '../../atoms/Box/Box';
import { Icon } from '../../atoms/Icons/Icon';
import * as S from './DashBoardHeaderStyles';

export const DashBoardHeader = ({
   title,
   icon,
}: {
   title: string;
   icon?: any;
}) => (
   <Box
      p="1rem"
      m="1rem 0"
      flexDirection="row"
      border="2px solid #000"
      borderRadius="1rem"
      width="100%"
      alignItems="center"
   >
      <S.Title>
         {icon && <Icon currentIcon={icon} />}
         {title}
      </S.Title>

      <Box gap="2rem">
         <S.Recurrence>
            <option value="test">test</option>
         </S.Recurrence>
      </Box>
   </Box>
);
