/**
 * 회사 코드 Enum
 *
 * @author 김이안
 */
export enum CompanyCodeEnum {
  ATHOMETRIP = '앳홈트립',
  TOURHARA = '투어하라',
}

/**
 * Enum에 있는 코드값인지 확인
 *
 * @param value
 */
function isValidCompanyCode(value: string): boolean {
  return Object.keys(CompanyCodeEnum).includes(value);
}

/**
 * 회사 코드에 맞는 회사명 출력
 *
 * @param companyCode
 */
export function getCompanyCodeValue(companyCode: string): string {
  if (isValidCompanyCode(companyCode)) {
    return CompanyCodeEnum[companyCode as keyof typeof CompanyCodeEnum];
  } else {
    throw new Error(`Not exist enum key: ${companyCode}`);
  }
}
