import BackgroundMainSection from "@/components/background-main-section";
import Image from "next/image";

export default function PoliticasPrivacidade() {
    return <div className="my-4">
        <BackgroundMainSection
            url="/bg-layout.jpg" />
        <h1 className="text-white text-6xl font-thin mb-10">Políticas de Privacidade</h1>
        <h2 className="text-white text-justify font-bold">1. Introdução</h2>
        <p className="text-white text-justify pl-5">Bem-vindo(a) à Área Refúgio, da Igreja do Evangelho Quadrangular, em Belém - Pará. A sua privacidade é importante para nós. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações pessoais ao utilizar nossos serviços e acessar nosso site.</p>
        <h2 className="text-white text-justify font-bold mt-4">2. Coleta de Informações</h2>
        <p className="text-white text-justify pl-5">Ao utilizar nossos serviços, podemos coletar as seguintes informações:</p>
        <ul className="text-white text-justify list-disc pl-10">
            <li>Informações pessoais: Nome, e-mail, telefone, endereço, CPF, data de nascimento e outros dados necessários para cadastro em eventos e compras.</li>
            <li>Informações financeiras: Dados de pagamento, como número do cartão de crédito (processados por parceiros de pagamento seguros) para inscrições pagas.</li>
            <li>Dados de navegação: Endereço IP, tipo de navegador, tempo de acesso, páginas visitadas e outras informações coletadas automaticamente.</li>
        </ul>
        <h2 className="text-white text-justify font-bold mt-4">3. Uso das Informações</h2>
        <p className="text-white text-justify pl-5">Utilizamos suas informações para:</p>
        <ul className="text-white text-justify list-disc pl-10">
            <li>Processamento de inscrições em eventos da igreja;</li>
            <li>Personalização da experiência do usuário em nosso site;</li>
            <li>Comunicações sobre eventos, atividades e atualizações da igreja;</li>
            <li>Processamento de pagamentos para eventos pagos;</li>
            <li>Cumprimento de obrigações legais e regulatórias;</li>
            <li>Melhoria dos nossos serviços e segurança do site.</li>
        </ul>
        <h2 className="text-white text-justify font-bold mt-4">4. Compartilhamento de Informações</h2>
        <p className="text-white text-justify pl-5">Não vendemos ou compartilhamos suas informações pessoais, exceto nos seguintes casos:</p>
        <ul className="text-white text-justify list-disc pl-10">
            <li>Com provedores de serviços terceirizados que nos auxiliam no processamento de pagamentos, hospedagem do site e comunicação;</li>
            <li>Para cumprimento de obrigações legais ou requisições governamentais;</li>
            <li>Em casos de fusão, aquisição ou reestruturação da entidade.</li>
        </ul>
        <h2 className="text-white text-justify font-bold mt-4">5. Proteção das Informações</h2>
        <p className="text-white text-justify pl-5">Adotamos medidas de segurança adequadas para proteger suas informações contra acesso, alteração ou divulgação não autorizada. No entanto, nenhum sistema é completamente seguro, e não podemos garantir 100% de proteção.</p>
        <h2 className="text-white text-justify font-bold mt-4">6. Direitos do Usuário</h2>
        <p className="text-white text-justify pl-5">Você tem o direito de:</p>
        <ul className="text-white text-justify list-disc pl-10">
            <li>Acessar, corrigir ou excluir suas informações pessoais;</li>
            <li>Solicitar a limitação do uso de seus dados;</li>
            <li>Revogar o consentimento para o uso de suas informações.</li>
        </ul>
        <p className="text-white text-justify pl-5">Para exercer seus direitos, entre em contato conosco pelo e-mail <a href="mailto:m.refugio.eventos@gmail.com">m.refugio.eventos@gmail.com</a>.</p>
        <h2 className="text-white text-justify font-bold mt-4">7. Cookies e Tecnologias de Rastreamento</h2>
        <p className="text-white text-justify pl-5">Nosso site pode utilizar cookies e tecnologias similares para melhorar a experiência do usuário. Você pode gerenciar as preferências de cookies em seu navegador.</p>
        <h2 className="text-white text-justify font-bold mt-4">8. Alterações na Política de Privacidade</h2>
        <p className="text-white text-justify pl-5">Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos os usuários sobre mudanças significativas através de nosso site ou outros meios de comunicação.</p>
        <h2 className="text-white text-justify font-bold mt-4">9. Contato</h2>
        <p className="text-white text-justify pl-5">Se tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco pelo e-mail <a href="mailto:m.refugio.eventos@gmail.com">m.refugio.eventos@gmail.com</a>.</p>
        <p className="text-white text-justify mt-16">Data da última atualização: 19 de março de 2025.</p>
    </div>;
}